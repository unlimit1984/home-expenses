import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    JwtModule.register({
      // secret: AUTH_SECRET,
      // signOptions: { expiresIn: '5s' }
    }),
  ],
  controllers: [AuthController],
  providers: [AccessTokenStrategy, RefreshTokenStrategy ]
})
export class AuthModule {}
