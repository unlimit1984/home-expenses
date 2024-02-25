/*
 * Author: Vladimir Vysokomornyi
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseV2 } from './db/expense.entity';
import { ExpenseDbService } from './db/expense-db.service';
import { ExpenseController } from './controllers/expense.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseV2])],
  providers: [ExpenseDbService],
  controllers: [ExpenseController]
})
export class ExpensesModule {}
