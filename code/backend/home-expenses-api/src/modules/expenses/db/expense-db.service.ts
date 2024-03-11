/*
 * Author: Vladimir Vysokomornyi
 */

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExpenseV2 } from './expense.entity';
import { CreateExpenseDto } from '../create.expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/db/user.entity';

@Injectable()
export class ExpenseDbService {
  constructor(
    @InjectRepository(ExpenseV2)
    private expenseRepository: Repository<ExpenseV2>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<ExpenseV2[]> {
    return this.expenseRepository.find({ relations: { user: true } });
  }
  async findByUserEmail(email: string): Promise<ExpenseV2[]> {
    return this.expenseRepository.findBy({ user: { email: email } });
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
    const user = this.userRepository.findOneBy({ email: dto.email });
    expenseV2.user = await user;

    const newExpenseV2 = this.expenseRepository.create(expenseV2);
    return this.expenseRepository.save(newExpenseV2);
  }

  async delete(expenseId: number): Promise<any> {
    return this.expenseRepository.delete({ id: expenseId });
  }
}
