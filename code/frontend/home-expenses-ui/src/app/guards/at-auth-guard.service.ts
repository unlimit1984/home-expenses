/*
 * Author: Vladimir Vysokomornyi
 */

import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenAuthService } from '../services/token-vault/token-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AtAuthGuard implements CanActivate, CanActivateChild {
  private router = inject(Router);
  private tokenAuthService = inject(TokenAuthService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('canActivate');

    if (this.tokenAuthService.isValidAccessToken()) {
      return true;
    }

    this.tokenAuthService.clearAccessToken();
    return this.router.parseUrl(`/auth/signin`);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('canActivateChild');
    return true;
  }
}
