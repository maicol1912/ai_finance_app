import { Module } from '@nestjs/common';
import { TransactionEntity } from './infraestructure/persistence/entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TransactionEntity
        ])
    ]
})
export class ExpenseModule { }
