/*
 * Author: Vladimir Vysokomornyi
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './db/user.entity';
import { UserDbService } from './db/user-db.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserDbService],
  controllers: [UserController]
})
export class UsersModule {}
