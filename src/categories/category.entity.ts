import { Transaction } from 'src/transactions/transaction.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  parentCategoryId: string;

  @Column({ nullable: true })
  userId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  color: string;

  @Column({ default: false })
  isDefault: string;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];

  @Column({ default: new Date() })
  createdAt: string;

  @Column({ default: new Date() })
  updatedAt: string;
}
