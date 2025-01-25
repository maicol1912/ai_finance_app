import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../handlers/get-user.query';
import { UserRepositoryInterface } from '@app/modules/user/domain/interfaces/repositories/user-repository.interface';
import { UserDomainEntity } from '@app/modules/user/domain/models/user-domain.entity';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {

  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(query: GetUserQuery): Promise<UserDomainEntity | null > {
    const { id } = query;
    return await this.userRepository.findById(id);
  }
}