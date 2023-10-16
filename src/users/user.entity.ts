import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Transaction } from 'src/transactions/transaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  mobileNumber: string;

  @Column({ nullable: true })
  profileImg: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @Column({ default: new Date() })
  createdAt: string;

  @Column({ default: new Date() })
  updatedAt: string;
}
