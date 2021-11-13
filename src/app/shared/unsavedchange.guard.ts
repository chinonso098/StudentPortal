import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ICanDeactivate } from './icandeactivate';

@Injectable({
  providedIn: 'root'
})
export class UnsavedchangeGuard implements CanDeactivate<ICanDeactivate> {
  canDeactivate(
    component: ICanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextstate?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(component.isFormDirty()){
        let formName = component.formName();
        return confirm(`Changes made to the ${formName} form will be lost`);
      }
    return true;
  }
  
}
