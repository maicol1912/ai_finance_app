import { Module } from '@nestjs/common';
import { RecommendationEntity } from './infraestructure/persistence/entities/recomendation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RecommendationEntity
        ])
    ]
})
export class RecomendationModule { }
