/*
 * Author: Vladimir Vysokomornyi
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseV2 } from './expense.entity';
import { ExpenseDbService } from './expense-db.service';
import { ExpenseController } from './expense.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseV2])],
  providers: [ExpenseDbService],
  controllers: [ExpenseController]
})
export class ExpensesModule {}
