import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaction } from './transaction.entity';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async save(transactionDto: TransactionDto) {
    const {
      categoryId,
      userId,
      date,
      amount,
      type,
      name,
      imagePath,
      description,
    } = transactionDto;
    const transaction = this.transactionRepository.create({
      categoryId,
      userId,
      date,
      amount,
      type,
      name,
      imagePath,
      description,
    });

    await this.transactionRepository.save(transaction);
    return transaction;
  }

  async update(transactionDto: TransactionDto, id: string) {
    const {
      categoryId,
      userId,
      date,
      amount,
      type,
      name,
      imagePath,
      description,
    } = transactionDto;
    return this.transactionRepository.save({
      id,
      categoryId,
      userId,
      date,
      amount,
      type,
      name,
      imagePath,
      description,
    });
  }

  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find({
      relations: {
        category: true,
        user: true,
      },
    });
  }

  async findOne(id: string): Promise<Transaction> {
    return this.transactionRepository.findOne({
      where: {
        id,
      },
      relations: {
        category: true,
        user: true,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.transactionRepository.delete({ id });
  }
}
