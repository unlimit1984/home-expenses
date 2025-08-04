/*
 * Author: Vladimir Vysokomornyi
 */

import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { REFRESH_TOKEN } from '../guards/token.constants';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, REFRESH_TOKEN) {
  constructor(private readonly configService: ConfigService) {
    Logger.debug('RefreshTokenStrategy secretOrKey=' + configService.get<string>('auth.rt_secret'));
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('auth.rt_secret')
      // passReqToCallback: true
    });
  }

  // async validate(req: Request, payload: any) {
  //   const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
  //   return { ...payload, refreshToken };
  // }
  async validate(payload: any) {
    return { email: payload.email };
  }
}
