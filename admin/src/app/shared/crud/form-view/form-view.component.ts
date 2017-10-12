import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseLoopBackApi } from '../../sdk/services/core/base.service';
import { Observable } from 'rxjs/Observable';

export interface Patchable  {
  patchAttributes(id: any, data: any, customHeaders?: Function): Observable<any>
}

export interface DetailFieldDefinition {
  key: string,
  errorMessages?: {key: string, message: string}[],
  inputType: string,
  label: string,
  validators?: [ValidatorFn]
}

type LoopBackServiceWithPatch = BaseLoopBackApi & Patchable

@Component({
  selector: 'form-view',
  templateUrl: './form-view.component.html'
})
export class FormViewComponent implements OnInit {

  @Input() dataFields: DetailFieldDefinition[];
  @Input() relativeUrl: string;
  @Input() itemApi: LoopBackServiceWithPatch;

  submitted: boolean;
  detailForm: FormGroup;
  item: any;
  formData: {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {

    // Construct form-group
    this.detailForm = new FormGroup({});

    for (const field of this.dataFields) {
      const control = new FormControl('', field.validators || []);
      // TODO manipulate validators
      this.detailForm.addControl(field.key, control);
    }

    // subscribe to form value changes
    this.detailForm.valueChanges.subscribe(
      data => this.formData = data
    );

    // find item by id and bind to values
    this.route.params
      .switchMap((params: Params) => {
        const id = params['id'];
        return id === 'add' ? Observable.of({ id: id }) : this.itemApi.findOne({where: { id: id }});
      })
      .subscribe(
        item => {
          // only bind if id present in url
          if (item['id'] !== 'add') {
            this.item = item;
            this.detailForm.patchValue(this.item, {onlySelf: true});
          }
        }
      );
  }

  onSubmit(value: any): void {
    this.submitted = true;

    if (this.detailForm.valid) {

      const api = this.itemApi;
      const updateOrCreate = this.item
        ? api.patchAttributes(this.item.id, this.formData)
        : api.create(this.formData);

      const message = this.item ? 'Update successful' : 'Item created successfully';

      updateOrCreate.subscribe(
            success => {
              this.router.navigate([this.relativeUrl]);
              this.toastrService.success((message));
            },
            error => {
              // TODO handle error
              console.log('Error:', error);
            }
          )
    }
  }

  cancel(): void {
    this.router.navigate([this.relativeUrl]);
  }

  firstError(key: string): string {
    const control = this.detailForm.get(key);
    return control.errors ? Object.keys(control.errors)[0] : null;
  }
}
