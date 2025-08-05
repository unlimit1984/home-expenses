/*
 * Author: Vladimir Vysokomornyi
 */

import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ACCESS_TOKEN } from '../guards/token.constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, ACCESS_TOKEN) {
  constructor(private readonly configService: ConfigService) {
    Logger.debug('AccessTokenStrategy secretOrKey=' + configService.get<string>('auth.at_secret'));
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretOrKey: configService.get<string>('auth.at_secret'),
      secretOrKey: 'test',
      passReqToCallback: false
    });
  }

  async validate(payload: any) {
    return { email: payload?.email, role: payload?.role };
  }
}
