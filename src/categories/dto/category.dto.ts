import { IsNotEmpty, IsOptional } from 'class-validator';

export class CategoryDto {
  @IsOptional()
  parentCategoryId: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  icon: string;

  @IsOptional()
  description: string;

  @IsOptional()
  color: string;

  @IsOptional()
  isDefault: boolean;
}
