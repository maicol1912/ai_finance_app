import { UserDomainEntity } from '@app/modules/user/domain/models/user-domain.entity';
import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand{
  constructor(
    public readonly user: UserDomainEntity,
  ) {}
}