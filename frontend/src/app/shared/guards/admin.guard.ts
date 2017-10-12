import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";
import { RoboUser } from "../../shared/sdk/models/RoboUser";
import { LoopBackAuth } from "../../shared/sdk/services/core/auth.service";

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(private loopBackAuth: LoopBackAuth, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.hasRole(state);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.hasRole(state);
  }

  private hasRole(state: RouterStateSnapshot) {
    const user: any = this.loopBackAuth.getCurrentUserData();

    if (user.roles.filter(r => r.name === "admin").length > 0) {
      return true;
    }

    this.router.navigate(["/403"]);
    return false;
  }
}
