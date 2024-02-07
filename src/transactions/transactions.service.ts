import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository, MoreThan, LessThan } from 'typeorm';

import { Transaction } from './transaction.entity';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionFilterDto } from './dto/transaction-filter.dto';
import { DateFilterType } from 'src/common/date-filter-type.modal';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  addDay(dateStr: string, days: number) {
    return new Date(
      new Date(dateStr).setDate(new Date(dateStr).getDate() + days),
    );
  }

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

  async findAll(
    userId: string,
    filterDto: TransactionFilterDto,
  ): Promise<Transaction[]> {
    const transactionQb = await this.transactionRepository
      .createQueryBuilder()
      .select('t')
      .from(Transaction, 't')
      .where({ userId: userId }); // filter by logged in user id

    // console.log(filterDto);

    // filter by category id
    if (filterDto?.cId) {
      transactionQb.andWhere({ categoryId: filterDto.cId });
    }

    // filter by transaction type
    if (filterDto?.t) {
      transactionQb.andWhere({ type: filterDto.t });
    }

    // filter by name or description
    if (filterDto?.q) {
      transactionQb.orWhere({
        name: ILike(`%${filterDto.q}%`),
        description: ILike(`%${filterDto.q}%`),
      });
    }

    if (filterDto?.dateFilterType) {
      switch (filterDto.dateFilterType) {
        case DateFilterType.DAILY:
          transactionQb.andWhere({
            date: MoreThan(filterDto.fromDate),
          });
          transactionQb.andWhere({
            date: LessThan(this.addDay(filterDto.fromDate, 1)),
          });
          break;
        case DateFilterType.WEEKLY:
        case DateFilterType.MONTHLY:
        case DateFilterType.YEARLY:
          transactionQb.andWhere({
            date: Between(filterDto.fromDate, filterDto.toDate),
          });
          break;
      }
    }
    // if (filterDto?.fromDate && filterDto?.toDate) {
    //   transactionQb.andWhere({
    //     date: Between(filterDto.fromDate, filterDto.fromDate),
    //   });
    // } else if (filterDto?.fromDate) {
    //   transactionQb.andWhere({ date: filterDto.fromDate });
    // }

    // console.log(transactionQb.getQueryAndParameters());
    return transactionQb.getMany();
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
