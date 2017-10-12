import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {RoleApi} from '../sdk/services/custom/Role';
import {Role} from '../sdk/models/Role';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RolesResolver implements Resolve<Role[]> {

  constructor(private api: RoleApi) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Role[]> {
    return this.api.find();
  }
}
