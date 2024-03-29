/*
 * Author: Vladimir Vysokomornyi
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { MailService } from '../../../services/mailer/mail.service';
import { UserDbService } from '../db/user-db.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const MailerServiceStub = {};

const UserDbServiceStub = {};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: MailService, useValue: MailerServiceStub },
        { provide: UserDbService, useValue: UserDbServiceStub },
        ConfigService,
        JwtService
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
