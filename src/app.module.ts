import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './config/env.schema.config';
import { AiModule } from './modules/ai/ai.module'; 
import { ExpenseModule } from './modules/expense/expense.module';
import { UserModule } from './modules/user/user.module';
import { InvestmentModule } from './modules/investment/investment.module';
import { MarketModule } from './modules/market/market.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/database.config';
import { SavingModule } from './modules/saving/saving.module';
import { RecomendationModule } from './modules/recomendation/recomendation.module';
import { PredictionModule } from './modules/prediction/prediction.module';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({ ...EnvConfig })]
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    CqrsModule.forRoot(),
    
    SharedModule,

    AiModule,
    ExpenseModule,
    UserModule,
    InvestmentModule,
    MarketModule,
    SavingModule,
    RecomendationModule,
    PredictionModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
