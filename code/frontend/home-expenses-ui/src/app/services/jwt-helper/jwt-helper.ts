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

  public getEmail(token: string): string {
    const tokenDecoded = Buffer.from(token.split('.')[1], 'base64').toString('utf8');

    try {
      return JSON.parse(tokenDecoded).email;
    } catch (error) {
      console.error('Error parsing JWT token:', error);
      return null;
    }
  }

  private tokenExpired(token: string) {
    const expiryDecoded = Buffer.from(token.split('.')[1], 'base64').toString('utf8');
    const expiry = JSON.parse(expiryDecoded).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
