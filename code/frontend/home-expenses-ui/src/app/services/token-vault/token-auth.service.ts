/*
 * Author: Vladimir Vysokomornyi
 */

import { inject, Injectable } from '@angular/core';
import { JwtHelper } from '../jwt-helper/jwt-helper';

enum TokenType {
  AT = 'at',
  RT = 'rt'
}

@Injectable({
  providedIn: 'root'
})
export class TokenAuthService {
  private jwtHelper = inject(JwtHelper);

  public saveAccessToken(at: string) {
    localStorage.setItem(TokenType.AT, at);
  }

  public getAccessToken() {
    return localStorage.getItem(TokenType.AT);
  }

  public saveRefreshToken(rt: string) {
    localStorage.setItem(TokenType.RT, rt);
  }

  public getRefreshToken() {
    return localStorage.getItem(TokenType.RT);
  }

  public clearAccessToken() {
    localStorage.removeItem(TokenType.AT);
  }

  public clearRefreshToken() {
    localStorage.removeItem(TokenType.RT);
  }

  public clearAllTokens() {
    localStorage.removeItem(TokenType.AT);
    localStorage.removeItem(TokenType.RT);
  }

  public isValidAccessToken(): boolean {
    return this.jwtHelper.isValidToken(this.getAccessToken());
  }
  public isValidRefreshToken(): boolean {
    return this.jwtHelper.isValidToken(this.getRefreshToken());
  }
}
