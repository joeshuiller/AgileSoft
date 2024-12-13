import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LocalStoreService } from '../service/utility/localstore/local-store.service';
import { Observable } from 'rxjs';
import { Menssage, RoutersLink } from '../models/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  public customerDetail: any = [];
  constructor(
    private router: Router,
    private localStore: LocalStoreService) {
      this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.localStore.getSuccessLogin();
      if(token === null){
        this.router.navigate([RoutersLink.login]);
        return false;
      }
      return true;
  }
}
