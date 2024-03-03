/*
 * Author: Vladimir Vysokomornyi
 */

import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';

@Injectable({ providedIn: 'root' })
export class JwtHelper {
  public isValidToken(token: string) {
    return token && token.length && !this.tokenExpired(token);
  }

  private tokenExpired(token: string) {
    const expiryDecoded = Buffer.from(token.split('.')[1], 'base64').toString('utf8');
    const expiry = JSON.parse(expiryDecoded).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
