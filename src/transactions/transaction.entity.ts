import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from 'src/categories/category.entity';
import { User } from 'src/users/user.entity';

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

  @Column()
  amount: string;

  @Column()
  type: string; // Should be enum - Income or Expense

  @Column({ nullable: true })
  imagePath: string;

  @Column({ default: new Date() })
  createdAt: string;

  @Column({ default: new Date() })
  updatedAt: string;

  @ManyToOne(() => Category, (category) => category.transactions)
  category: Category;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}
