import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './config/env.schema.config';
import { AiModule } from './modules/ai/ai.module'; 
import { ExpenseModule } from './modules/expense/expense.module';
import { UserModule } from './modules/user/user.module';
import { InvestmentModule } from './modules/investment/investment.module';
import { MarketModule } from './modules/market/market.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({ ...EnvConfig })]
    }),
    AiModule,
    ExpenseModule,
    UserModule,
    InvestmentModule,
    MarketModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
