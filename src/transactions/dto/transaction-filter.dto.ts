import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { DateFilterType } from 'src/common/date-filter-type.modal';
import { TransactionType } from '../transaction-type.model';

export class TransactionFilterDto {
  @IsOptional()
  q?: string;

  @IsOptional()
  @IsUUID()
  cId?: string; // categoryId - ALL (empty - Don't apply category filter) or CategoryId

  @IsOptional()
  @IsEnum(DateFilterType)
  dateFilterType?: DateFilterType; // Enum - Daily, Weekly, Monthly, Yearly

  @IsOptional()
  fromDate?: string;

  @IsOptional()
  toDate?: string;

  @IsOptional()
  @IsEnum(TransactionType)
  t?: TransactionType; // transaction type - Either Income/Expense
}
