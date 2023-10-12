import { Controller, Get } from '@nestjs/common';
import { Delete, Param, Patch, Post } from '@nestjs/common/decorators/http';

@Controller('transactions')
export class TransactionsController {
  @Post()
  create() {
    return 'Will create new transaction';
  }

  @Get()
  findAll() {
    return 'Returns all the transactions list';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Return ${id} from the transaction`;
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return `Will update this transaction -> ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Remove this transaction -> ${id}`;
  }
}
