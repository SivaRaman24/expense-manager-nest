import { Controller, Get, Body } from '@nestjs/common';
import { Delete, Param, Patch, Post } from '@nestjs/common/decorators/http';

import { TransactionsService } from './transactions.service';
import { TransactionDto } from './dto/transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  create(@Body() transactionDto: TransactionDto) {
    return this.transactionsService.save(transactionDto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() transactionDto: TransactionDto) {
    return this.transactionsService.update(transactionDto, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
