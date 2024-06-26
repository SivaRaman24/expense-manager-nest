import { Controller, Get, Body, Request } from '@nestjs/common';
import {
  Delete,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common/decorators/http';

import { TransactionsService } from './transactions.service';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionFilterDto } from './dto/transaction-filter.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  create(@Body() transactionDto: TransactionDto) {
    transactionDto = {
      ...transactionDto,
      userId: '5357d553-7026-47fe-b13e-1f3d984a0aef', // TODO: Replace user id from the logged in user header details
    };
    return this.transactionsService.save(transactionDto);
  }

  @Get()
  findAll(@Request() req, @Query() filterDto: TransactionFilterDto) {
    return this.transactionsService.findAll(req.user?.id, filterDto);
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
