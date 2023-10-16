import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

Entity();
export class ScheduledTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  transactionId: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  frequencyType: string; // Enum - Daily, Weekly, Monthly

  @Column()
  frequencyInterval: number; // Daily - [1 to 31], Weekly - [1-4], Monthly - [1 to 12]

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: new Date() })
  createdAt: string;

  @Column({ default: new Date() })
  updatedAt: string;
}
