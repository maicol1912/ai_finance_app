import { UserDomainEntity } from '@app/modules/user/domain/models/user-domain.entity';

export class CreateUserCommand {
  constructor(
    public readonly user: UserDomainEntity,
  ) {}
}