/*
 * Author: Vladimir Vysokomornyi
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './db/user.entity';
import { UserDbService } from './db/user-db.service';
import { UserController } from './controllers/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthController } from './controllers/auth.controller';
import { AccessTokenStrategy } from './auth/strategies/access-token.strategy';
import { RefreshTokenStrategy } from './auth/strategies/refresh-token.strategy';
import { MailService } from '../../services/mailer/mail.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      // secret: AUTH_SECRET,
      // signOptions: { expiresIn: '5s' }
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('mail.host'),
          auth: {
            user: configService.get<string>('mail.username'),
            pass: configService.get<string>('mail.appPassword')
          }
        },
        defaults: {
          from: '"home-expenses" <noreply@home.expenses.com>'
        }
      })
    })
  ],
  providers: [UserDbService, MailService, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [UserController, AuthController]
})
export class UsersModule {}
