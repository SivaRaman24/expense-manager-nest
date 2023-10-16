import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ScheduledTransaction } from './scheduled-transaction.entity';
import { ScheduledTransactionDto } from './dto/scheduled-transaction.dto';

@Injectable()
export class ScheduledTransactionsService {
  constructor(
    @InjectRepository(ScheduledTransaction)
    private scheduledTransactionRepository: Repository<ScheduledTransaction>,
  ) {}

  async create(scheduledTransactionDto: ScheduledTransactionDto) {
    const {
      transactionId,
      name,
      description,
      startDate,
      endDate,
      frequencyType,
      frequencyInterval,
      isActive,
    } = scheduledTransactionDto;

    return this.scheduledTransactionRepository.save({
      transactionId,
      name,
      description,
      startDate,
      endDate,
      frequencyType,
      frequencyInterval,
      isActive,
    });
  }

  async findAll(): Promise<ScheduledTransaction[]> {
    return this.scheduledTransactionRepository.find();
  }

  async findOne(id: string): Promise<ScheduledTransaction> {
    return this.scheduledTransactionRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.scheduledTransactionRepository.delete({ id });
  }
}
