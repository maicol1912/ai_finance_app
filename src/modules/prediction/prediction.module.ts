import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredictionEntity } from './infraestructure/persistence/entities/prediction.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PredictionEntity
        ])
    ]
})
export class PredictionModule { }
