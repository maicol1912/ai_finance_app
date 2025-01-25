import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingEntity } from './infraestructure/persistence/entities/saving.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([
            SavingEntity
        ])
    ]
})
export class SavingModule {}
