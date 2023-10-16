import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

/* Feature Modules */
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';
import { ScheduledTransactionsModule } from './scheduled-transactions/scheduled-transactions.module';

@Module({
  imports: [
    AuthModule,
    CategoriesModule,
    TransactionsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'postgres',
      database: 'expense-manager',
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    ScheduledTransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
