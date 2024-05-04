import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TransactionType } from '../transaction-type.model';

export class TransactionDto {
  @IsNotEmpty()
  categoryId: string;

  userId: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  amount: string;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType; // Should be enum - Income or Expense

  @IsOptional()
  imagePath: string;
}
