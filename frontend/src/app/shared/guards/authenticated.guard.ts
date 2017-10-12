import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router'
import {Injectable} from '@angular/core'
import {LoopBackAuth} from '../../shared/sdk/services/core/auth.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate, CanActivateChild {

  constructor(private loopBackAuth: LoopBackAuth, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isAuthenticated(state);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isAuthenticated(state);
  }

  private isAuthenticated(state: RouterStateSnapshot) {
    if (this.loopBackAuth.getAccessTokenId()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
