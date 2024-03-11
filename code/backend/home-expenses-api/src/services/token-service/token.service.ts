/*
 * Author: Vladimir Vysokomornyi
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  public isValidEmail(email: string, authorization: string) {
    if (!authorization || !authorization.includes('Bearer', 0) || authorization.length <= 7) {
      return false;
    }

    const token: string = authorization.substring(7);
    const emailDecoded: string = Buffer.from(token.split('.')[1], 'base64').toString('utf8');
    const emailFromToken = JSON.parse(emailDecoded).email;

    return email === emailFromToken;
  }

  public getEmailFromToken(authorization: string) {
    if (!authorization || !authorization.includes('Bearer', 0) || authorization.length <= 7) {
      return null;
    }

    const token: string = authorization.substring(7);
    const emailDecoded: string = Buffer.from(token.split('.')[1], 'base64').toString('utf8');
    return JSON.parse(emailDecoded).email;
  }
}
