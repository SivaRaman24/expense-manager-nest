import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './category.entity';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(categoryDto: CategoryDto) {
    const { parentCategoryId, name, description, color, icon } = categoryDto;
    return await this.categoryRepository.save({
      parentCategoryId,
      name,
      description,
      color,
      icon,
    });
  }

  async update(categoryDto: CategoryDto, id: string) {
    const { parentCategoryId, name, description, color, icon } = categoryDto;
    return await this.categoryRepository.save({
      id,
      parentCategoryId,
      name,
      description,
      color,
      icon,
    });
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.categoryRepository.delete({ id });
  }
}
