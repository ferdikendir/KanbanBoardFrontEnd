import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { LoginService } from '../login-screen/login.service';
import { ProjectAction } from './state/project.action';
import { ProjectState } from './state/project.state';

@Injectable({
  providedIn: 'root'
})
export class ProjectListResolver implements Resolve<boolean> {
  @Select (ProjectState.getProjects) projects$: Observable<any[]>;
  constructor(
    private store:Store,
    private loginService: LoginService,
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if(this.loginService.currentUserValue)
      return this.store.dispatch( ProjectAction);
    return of(true);
  }
}
