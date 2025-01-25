import { Module } from '@nestjs/common';
import { MarketEntity } from './infraestructure/persistence/entities/market.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MarketEntity
        ])
    ]
})
export class MarketModule { }
