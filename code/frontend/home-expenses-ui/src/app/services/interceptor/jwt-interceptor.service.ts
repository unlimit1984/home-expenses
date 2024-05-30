/*
 * Author: Vladimir Vysokomornyi
 */

import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenAuthService } from '../token-vault/token-auth.service';
import { JwtHelper } from '../jwt-helper/jwt-helper';
import { ConfigService } from '../config/config.service';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  private configService: ConfigService = inject(ConfigService);
  private tokenAuthService = inject(TokenAuthService);
  private jwtHelper = inject(JwtHelper);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string;

    switch (req.url) {
      case `${this.configService.config.API}/auth/refresh-token`:
        token = this.tokenAuthService.getRefreshToken();
        break;
      default:
        token = this.tokenAuthService.getAccessToken();
        break;
    }

    if (this.jwtHelper.isValidToken(token)) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req);
  }
}
