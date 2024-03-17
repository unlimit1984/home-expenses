/*
 * Author: Vladimir Vysokomornyi
 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { REFRESH_TOKEN } from '../guards/token.constants';
// import { AUTH_REFRESH_TOKEN_SECRET } from '../../../../config/auth';
import { Request } from 'express';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, REFRESH_TOKEN) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('auth.at_secret'),
      passReqToCallback: true
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
