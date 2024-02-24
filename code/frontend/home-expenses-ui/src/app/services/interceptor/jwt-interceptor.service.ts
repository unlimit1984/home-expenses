import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenVaultService } from '../token-vault/token-vault.service';
import { JwtHelper } from '../jwt-helper/jwt-helper';
import { ConfigService } from '../config/config.service';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  private configService: ConfigService = inject(ConfigService);
  private authApiUrl = this.configService.config.API;
  private tokenVault = inject(TokenVaultService);
  private jwtHelper = inject(JwtHelper);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('=intercept');
    let token;

    switch (req.url) {
      case `${this.authApiUrl}/auth/refresh-token`:
        token = this.tokenVault.getRefreshToken();
        break;
      default:
        token = this.tokenVault.getAccessToken();
        break;
    }

    if (token && token.length && !this.jwtHelper.tokenExpired(token)) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req);
  }
}
