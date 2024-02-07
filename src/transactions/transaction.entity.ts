import {
  CreateDateColumn,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category } from 'src/categories/category.entity';
import { User } from 'src/users/user.entity';
import { TransactionType } from './transaction-type.model';
import { IsEnum } from 'class-validator';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  categoryId: string;

  @Column({ nullable: true })
  userId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  date: string;

  @Column({ default: 'IN' })
  currencyCode: string; // currency short code or id will be stored

  @Column()
  amount: string;

  @Column()
  @IsEnum(TransactionType)
  type: TransactionType; // Should be enum - Income or Expense

  @Column({ nullable: true })
  imagePath: string;

  @CreateDateColumn()
  @Column({ type: 'timestamptz', default: new Date() })
  createdAt: string;

  @UpdateDateColumn()
  @Column({ type: 'timestamptz', default: new Date() })
  updatedAt: string;

  @ManyToOne(() => Category, (category) => category.transactions)
  category: Category;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}
