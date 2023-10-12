import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/* Feature Modules */
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, CategoriesModule, TransactionsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
