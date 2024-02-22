/*
 * Author: Vladimir Vysokomornyi
 */

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExpenseV2 } from './expense.entity';
import { CreateExpenseDto } from './create.expense.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExpenseDbService {
  constructor(
    @InjectRepository(ExpenseV2)
    private expenseRepository: Repository<ExpenseV2>
  ) {}

  async findAll(): Promise<ExpenseV2[]> {
    return this.expenseRepository.find();
  }

  async findById(id: number): Promise<ExpenseV2> {
    return this.expenseRepository.findOneBy({ id: id });
  }

  async create(dto: CreateExpenseDto): Promise<ExpenseV2> {
    const expenseV2 = new ExpenseV2();
    expenseV2.category = dto.category;
    expenseV2.cost = dto.cost;
    expenseV2.date = dto.date;
    expenseV2.comment = dto.comment;

    const newExpenseV2 = this.expenseRepository.create(expenseV2);
    return this.expenseRepository.save(newExpenseV2);
  }

  async delete(expenseId: number): Promise<any> {
    return this.expenseRepository.delete({ id: expenseId });
  }
}
