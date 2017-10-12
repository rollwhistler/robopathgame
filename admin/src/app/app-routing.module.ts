import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {DASHBOARD_ROUTES} from './dashboard/dashboard-routing.module';
import {RequestPasswordResetComponent} from './auth/request-password-reset/request-password-reset.component';
import {ResetPasswordComponent} from './auth/reset-password/reset-password.component';
import {ForbiddenComponent} from './auth/forbidden/forbidden.component';
import {BasicLayoutComponent} from './shared/layout/basicLayout.component';
import {AuthenticatedGuard} from './shared/guards/authenticated.guard';
import {AdminGuard} from './shared/guards/admin.guard';

const CHILD_ROUTES: Routes = DASHBOARD_ROUTES;

const appRoutes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'request-password-reset', component: RequestPasswordResetComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},

  {
    path: '',
    component: BasicLayoutComponent,
    canActivateChild: [AuthenticatedGuard, AdminGuard],
    children: CHILD_ROUTES
  },

  { path: '403', component: ForbiddenComponent },
  { path: '**', component: LoginComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule { }
