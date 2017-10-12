import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PipesModule} from '../pipes/pipes.module';
import {LayoutComponent} from './layout.component';
import {NavbarComponent} from './navbar/navbar.component';


@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    NgbModule,
    PipesModule
  ],
  exports: [
    LayoutComponent
  ],
})

export class LayoutModule {
}
