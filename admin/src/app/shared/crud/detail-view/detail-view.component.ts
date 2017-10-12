import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

export interface DetailField {

  key: string,
  label: string,
  placeholder?: string,
  controlType: string,
  inputType?: string,

  validators?: [ValidatorFn]
  errorMessages?: {key: string, message: string}[],

  options?: { id: string, text: string }[],
  multiple?: boolean,

  typeaheadFn?: (text: Observable<string>) => Observable<any[]>
  typeaheadFormatterFn?: (obj: any) => string
}

@Component({
  selector: 'detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {

  @Input() model: Observable<any>;
  @Input() fields: DetailField[];

  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();

  submitted: boolean;
  isNew: boolean;
  detailForm: FormGroup;

  typeaheadFields = {};

  formData: {};

  constructor() { }

  ngOnInit(): void {

    this.model.subscribe(
      model => {

        this.isNew = !model.id;

        // Construct form-group
        this.detailForm = new FormGroup({});

        for (const field of this.fields) {

          const control = new FormControl(model[field.key], field.validators || []);
          this.detailForm.addControl(field.key, control);

          if (field.controlType === 'typeahead') {
            this.typeaheadFields[field.key] = field;
          }

        }

        // subscribe to form value changes
        this.detailForm.valueChanges.subscribe(
          data => this.formData = data
        );

      }
    );

  }

  onSubmit(value: any): void {

    this.submitted = true;

    if (this.detailForm.valid) {
      this.save.emit(this.formData);
    }

  }

  onCancel(): void {
    this.cancel.emit();
  }

  firstError(key: string): string {
    const control = this.detailForm.get(key);
    return control.errors ? Object.keys(control.errors)[0] : null;
  }

}
