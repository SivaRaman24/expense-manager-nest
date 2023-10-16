import { IsNotEmpty, IsOptional } from 'class-validator';

export class ScheduledTransactionDto {
  @IsNotEmpty()
  transactionId: string;

  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;

  @IsNotEmpty()
  frequencyType: string;

  @IsNotEmpty()
  frequencyInterval: number; // Should be enum - Income or Expense

  @IsOptional()
  isActive: boolean;
}
