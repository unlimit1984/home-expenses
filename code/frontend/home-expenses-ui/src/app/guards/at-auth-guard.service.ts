/*
 * Author: Vladimir Vysokomornyi
 */

import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenAuthService } from '../services/token-vault/token-auth.service';
// import { bcc, BCCMessageType } from '../broadcast-channel/broadcast-channel';
import { BCCMessageType } from '../broadcast-channel/broadcast-channel';
import { BroadcastService } from '../services/broadcast-channel/broadcast.service';

@Injectable({
  providedIn: 'root'
})
export class AtAuthGuard {
  private router = inject(Router);
  private tokenAuthService = inject(TokenAuthService);

  constructor(private broadcastService: BroadcastService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenAuthService.isValidAccessToken()) {
      return true;
    }

    this.tokenAuthService.clearAllTokens();
    this.broadcastService.sendMessage(BCCMessageType.Logout);
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
