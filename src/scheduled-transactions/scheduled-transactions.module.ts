import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduledTransactionsService } from './scheduled-transactions.service';
import { ScheduledTransaction } from './scheduled-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduledTransaction])],
  providers: [ScheduledTransactionsService],
})
export class ScheduledTransactionsModule {}
