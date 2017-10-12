import {BrowserModule} from '@angular/platform-browser';
import {enableProdMode, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


import {AppRoutingModule} from './app-routing.module';

import {DashboardModule} from './dashboard/dashboard.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LayoutModule} from './shared/layout/layout.module';
import {GuardsModule} from './shared/guards/guards.module';
import {PipesModule} from './shared/pipes/pipes.module';
import {SDKBrowserModule} from './shared/sdk/index';
import {Http, RequestOptions, XHRBackend} from '@angular/http';
import {httpFactory} from './shared/http/http.factory';
import {Router, RouterModule} from '@angular/router';
import {ToastrModule, ToastrService} from 'ngx-toastr';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {TestingModule} from './testing.module';

if (environment.production) {
  enableProdMode();
}

const imports = [
  BrowserModule,
  BrowserAnimationsModule,
  LayoutModule,
  DashboardModule,
  AppRoutingModule,
  RouterModule,
  AuthModule,
  GuardsModule,
  PipesModule,
  CommonModule,
  SDKBrowserModule.forRoot(),
  ReactiveFormsModule,
  NgbModule.forRoot(),
  ToastrModule.forRoot()
];

if(environment.e2e) imports.push(TestingModule);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    imports
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, Router, ToastrService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
