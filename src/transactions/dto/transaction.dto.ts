import { IsNotEmpty, IsOptional } from 'class-validator';

export class TransactionDto {
  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
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
  type: string; // Should be enum - Income or Expense

  @IsOptional()
  imagePath: string;
}
