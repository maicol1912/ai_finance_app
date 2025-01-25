import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserDomainEntity } from '../../domain/models/user-domain.entity';
import { BuilderPrototype } from '@app/shared/utils/builder/builder';
import { CreateUserDto } from '../../api/http/dto/create-user.dto';
import { CreateUserCommand } from '../commands/handlers/create-user.command';

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus, // Inyectar el CommandBus
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    return await this.commandBus.execute(new CreateUserCommand(createUserDto as UserDomainEntity));
  }
}