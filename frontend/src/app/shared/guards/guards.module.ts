import {NgModule} from '@angular/core';
import {AuthenticatedGuard} from './authenticated.guard';
import {AdminGuard} from './admin.guard';

@NgModule({
  providers: [
    AuthenticatedGuard,
    AdminGuard
  ]
})
export class GuardsModule {}
