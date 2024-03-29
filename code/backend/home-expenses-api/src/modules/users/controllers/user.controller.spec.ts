/*
 * Author: Vladimir Vysokomornyi
 */

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserDbService } from '../db/user-db.service';

xdescribe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserDbService]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
