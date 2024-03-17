/*
 * Author: Vladimir Vysokomornyi
 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { AUTH_ACCESS_TOKEN_SECRET } from '../../../../config/auth';
import { ACCESS_TOKEN } from '../guards/token.constants';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, ACCESS_TOKEN) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('auth.at_secret')
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
