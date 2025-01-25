import { Module } from '@nestjs/common';
import { InvestmentEntity } from './infraestructure/persistence/entities/investment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            InvestmentEntity
        ])
    ]
})
export class InvestmentModule { }
