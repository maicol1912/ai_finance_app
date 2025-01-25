import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { BaseRepository } from "@app/shared/infraestructure/database/repository/base.repository";
import { UserRepositoryInterface } from "@app/modules/user/domain/interfaces/repositories/user-repository.interface";
import { UserDomainEntity } from "@app/modules/user/domain/models/user-domain.entity";


@Injectable()
export class UserRepository
  extends BaseRepository<UserEntity, 'id', UserDomainEntity>
  implements UserRepositoryInterface
{
  constructor(
    @InjectDataSource() dataSource:DataSource
  ) {
    super(dataSource, UserEntity, 'id');
  }

  public async findByEmail(email: string): Promise<UserDomainEntity | null> {
    return this.findByField({ email });
  }

  public async findByUsername(username: string): Promise<UserDomainEntity | null> {
    return this.findByField({ username });
  }
}