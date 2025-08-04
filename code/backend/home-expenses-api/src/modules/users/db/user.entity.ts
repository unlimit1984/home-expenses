/*
 * Author: Vladimir Vysokomornyi
 */

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
import { ExpenseV2 } from '../../expenses/db/expense.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  @IsEmail({}, { message: 'Unknown email format' })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  preview: boolean;

  @Column({ nullable: true })
  verificationCodeHash: string;

  @Column({ nullable: true })
  refreshTokenHash: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  secondName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: false })
  pendingRecover: boolean;

  @OneToMany(() => ExpenseV2, (expense) => expense.user)
  expenses: ExpenseV2[];

  @Column({ nullable: true })
  role: string;
}
