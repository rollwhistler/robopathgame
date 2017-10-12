import { NgModule } from '@angular/core';
import { ListViewComponent } from './list-view/list-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormViewComponent } from './form-view/form-view.component';
import {DetailViewComponent} from './detail-view/detail-view.component';
import {SelectModule} from 'ng2-select';

@NgModule({
  declarations: [
    ListViewComponent,
    FormViewComponent,
    DetailViewComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    PipesModule,
    ReactiveFormsModule,
    SelectModule
  ],
  exports: [
    ListViewComponent,
    FormViewComponent,
    DetailViewComponent
  ]

})
export class CrudModule { }
