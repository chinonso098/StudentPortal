import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidParamGuard implements CanActivate {
  private _goBackRoute: Router;

  constructor(goBackRoute: Router){
    this._goBackRoute = goBackRoute;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const id = Number(route.paramMap.get('studentID'))

      if(isNaN(id) || id < 1){
        alert('Invalid id');
        this._goBackRoute.navigate(['/students']);

        return false;
      }
    return true;
  }
  
}
