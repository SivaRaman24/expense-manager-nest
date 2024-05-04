import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(CreateUserDto: CreateUserDto) {
    const { firstName, lastName, email, password, mobileNumber } =
      CreateUserDto;

    const user = await this.findUserByEmail(email);
    if (user) {
      console.log('user already exist', user);
      throw new ConflictException('User already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return await this.usersRepository.save({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobileNumber,
    });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {
        transactions: true,
      },
    });
  }

  findOne(id: string): Promise<User | null> {
    try {
      return this.usersRepository.findOne({
        where: { id },
        relations: {
          transactions: true,
        },
      });
    } catch (e) {
      return e;
    }
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(id: string): Promise<void> {
    try {
      await this.usersRepository.delete({ id });
    } catch (e) {
      return e;
    }
  }
}
