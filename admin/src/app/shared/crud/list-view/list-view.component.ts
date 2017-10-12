import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { LoopBackFilter } from '../../sdk/models/BaseModels';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseLoopBackApi } from '../../sdk/services/core/base.service';
import { ToastrService } from 'ngx-toastr';
import swal, { SweetAlertOptions } from 'sweetalert2';

export interface ListViewColumn {

  key?: string;
  title?: string;

  renderTitle?: (ListViewColumn) => string;
  renderCell?: (ListViewColumn, any) => string;

}

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  providers: []
})
export class ListViewComponent implements OnInit {

  @ContentChild(TemplateRef)
  template: TemplateRef<any>;

  @Input() api: BaseLoopBackApi;
  @Input() whereBuilder: (string) => {};
  @Input() include?: any;

  @Input() columns: [ListViewColumn];

  @Input() relativeUrl: string;

  items: any[];
  count;
  currentPage: number;
  selectAll: boolean;
  displayDelete: boolean;

  filter: LoopBackFilter = {};
  searchForm: FormGroup;
  query: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) { }

  defaultRenderTitle(column: ListViewColumn): string {
    return column.title;
  }

  defaultRenderCell(column: ListViewColumn, item: any): string {
    return item[column.key];
  }


  ngOnInit(): void {

    // initialize column definitions

    for (const column of this.columns) {
      if (typeof column.renderTitle === 'undefined') { column.renderTitle = this.defaultRenderTitle; }
      if (typeof column.renderCell === 'undefined') { column.renderCell = this.defaultRenderCell; }
    }

    //

    this.processQueryParams();
  }

  processQueryParams() {

    this.route
      .queryParams
      .subscribe(params => {

        // clear filter state
        this.filter = {};

        // build filter

        const filter = this.filter;

        filter.offset = +params['offset'] || 0;
        filter.limit = +params['limit'] || 8;
        filter.include = this.include || {};

        const query = params['q'];

        if (query && query !== '') {
          this.buildWhereClause(query);
        }

        // configure paging
        this.currentPage = Math.floor(filter.offset / filter.limit + 1);

        // create search form
        this.createSearchForm(query);

        // load from API
        this.fetchFromAPI();
      });
  }

  buildWhereClause(query: string): void {
    this.filter.where = this.whereBuilder(query);
  }

  createSearchForm(query: string): void {

    this.searchForm = this.fb.group({
      query: query,
    });

    this.searchForm.valueChanges
      .subscribe(data => {
        this.buildWhereClause(data.query);
        this.query = data.query;
      });
  }

  onPageChange(page: number) {

    if (page && !isNaN(page)) {
      this.filter.offset = (page - 1) * this.filter.limit;
      this.onFilterChange();
    }

  }

  onFilterChange() {

    const params = {
      offset: this.filter.offset,
      limit: this.filter.limit
    };

    if (this.query) {
      params['q'] = this.query;
    }

    this.router.navigate([ this.relativeUrl ], { queryParams: params });
  }

  fetchFromAPI() {

    const count = this.api.count(this.filter.where);
    const find = this.api.find(this.filter);

    const combined = count.combineLatest(find, (c, i) => {
      return { count: c.count, items: i};
    });

    combined.subscribe(
      data => {
        this.count = data.count;
        this.items = data.items;

        for (const item of this.items) {
          item.selected = false;
        }
      }
    );

  }

  onSelectAll() {
    this.selectAll = !this.selectAll;
    for (const item of this.items) {
      item.selected = this.selectAll;
    }
    // display delete button if all selected
    this.displayDelete = this.selectAll;
  }

  onSelected(item) {
    item.selected = !item.selected;

    let displayDelete = false;

    for (const i of this.items) {
      if (i.selected) {
        displayDelete = true;
      }
    }
    this.displayDelete = displayDelete;
  }


  prepareDeleteItem(item) {

    const message = 'Yes, delete it!';

    this.confirmDelete(message, item);
  }

  prepareDeleteSelectedItems() {
    const message = 'Yes, delete selected!';
    this.confirmDelete(message);
  }

  confirmDelete(message: string, item?: any) {

    const self = this;

    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: message,
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true
    }).then( function () {
      if (item) {
        self.deleteOne(item);
      } else {
        self.deleteMany();
        // reset select all
        self.selectAll = false;
        self.displayDelete = false;
      }
    }, function (dismiss) {
      if (dismiss === 'cancel') {
        self.toastrService.error('Cancelled');
      }
    })
  }

  deleteMany() {
    for (const item of this.items) {
      if (item.selected) {
        this.api.deleteById(item.id)
          .subscribe(
            success => {
              this.fetchFromAPI();
              this.toastrService.warning('Item deleted.');
            },
            error => {
              console.error('Failed to delete', error);
            }
          )
      }
    }
  }

  deleteOne(item) {
    this.api.deleteById(item.id)
      .subscribe(
        success => {
          this.fetchFromAPI();
          this.toastrService.warning('Item deleted.');
        },
        error => {
          console.error('Failed to delete', error);
        }
      )
  }
}
