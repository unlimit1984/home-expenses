/*
 * Author: Vladimir Vysokomornyi
 */

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/db/user.entity';

@Entity()
export class ExpenseV2 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  cost: number;

  @Column({ nullable: true })
  comment: string;

  @Column({ type: 'bigint' })
  date: string;

  @ManyToOne(() => User, (user) => user.expenses)
  user: User;
}
