import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {GuardsModule} from './shared/guards/guards.module';
import {PipesModule} from './shared/pipes/pipes.module';
import {Http, RequestOptions, XHRBackend} from '@angular/http';
import {httpFactory} from './shared/http/http.factory';
import {Router, RouterModule} from '@angular/router';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {LayoutModule} from './shared/layout/layout.module';
import {AppRoutingModule} from './app-routing.module';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {SDKBrowserModule} from './shared/sdk/index';
import {DashboardModule} from './dashboard/dashboard.module';
import {AuthModule} from './auth/auth.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PipesModule,
    GuardsModule,
    LayoutModule,
    AuthModule,
    DashboardModule,
    AppRoutingModule,
    SDKBrowserModule.forRoot(),
    ReactiveFormsModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    CommonModule,
    RouterModule
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
