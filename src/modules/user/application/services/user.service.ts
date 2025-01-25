import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserDomainEntity } from '../../domain/models/user-domain.entity';
import { BuilderPrototype } from '@app/shared/utils/builder/builder';
import { CreateUserDto } from '../../api/http/dto/create-user.dto';
import { CreateUserCommand } from '../commands/handlers/create-user.command';
import { EmailValueObject } from '../../domain/value-objects/email.value-object';
import { UserUseCase } from '../../domain/interfaces/services/user.use-case';
import { GetUserQuery } from '../queries/handlers/get-user.query';

@Injectable()
export class UserService implements UserUseCase{
  constructor(
    private readonly commandBus: CommandBus, 
    private readonly queryBus:QueryBus
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    new EmailValueObject(createUserDto.email)

    const userDomain = new BuilderPrototype(UserDomainEntity)
    .assign({...createUserDto})
    .build()

    await userDomain.encryptPassword()
    
    return await this.commandBus.execute(new CreateUserCommand(userDomain));
  }

  async findUserById(id: string): Promise<UserDomainEntity | null> {
    return await this.queryBus.execute(new GetUserQuery(id))
  }
}