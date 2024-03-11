/*
 * Author: Vladimir Vysokomornyi
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseV2 } from './db/expense.entity';
import { ExpenseDbService } from './db/expense-db.service';
import { ExpenseController } from './controllers/expense.controller';
import { TokenService } from '../../services/token-service/token.service';
import { User } from '../users/db/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseV2, User])],
  providers: [ExpenseDbService, TokenService],
  controllers: [ExpenseController]
})
export class ExpensesModule {}
