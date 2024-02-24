/*
 * Author: Vladimir Vysokomornyi
 */

import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './user/entity/user';
import { ExpenseV2 } from './expense/entity/expense';

@Module({
  imports: []
  // providers: [...databaseProviders],
  // exports: [...databaseProviders]
})
export class DatabaseModule {}
