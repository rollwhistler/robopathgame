import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RequestPasswordResetComponent} from './request-password-reset/request-password-reset.component';
import {RouterModule} from '@angular/router';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {SignupComponent} from './signup/signup.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    NgbModule,
    HttpClientModule
  ],
  declarations: [
    LoginComponent,
    RequestPasswordResetComponent,
    ResetPasswordComponent,
    ForbiddenComponent,
    SignupComponent
  ]
})
export class AuthModule {}
