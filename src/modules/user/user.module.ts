import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infraestructure/persistence/entities/user.entity';
import { UserRepositoryInterface } from "@app/modules/user/domain/interfaces/repositories/user-repository.interface";
import { UserRepository } from './infraestructure/persistence/repositories/user.repository';
import { UserController } from './api/http/controllers/user.controller';
import { UserUseCase } from './domain/interfaces/services/user.use-case';
import { UserService } from './application/services/user.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './application/commands/implementations/create-user.handler';

@Module({
    imports:[
        TypeOrmModule.forFeature([
            UserEntity,
        ]),
        CqrsModule
    ],
    controllers:[
        UserController
    ],
    providers:[
        CreateUserHandler,
        {
            provide: UserRepositoryInterface,
            useClass: UserRepository
        },
        {
            provide: UserUseCase,
            useClass: UserService
        }
    ]
})
export class UserModule {

}
