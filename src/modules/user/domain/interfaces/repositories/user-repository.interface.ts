import { UserEntity } from "@app/modules/user/infraestructure/persistence/entities/user.entity";
import { BaseRepositoryInterface } from "@app/shared/infraestructure/database/repository/base-repository.interface";
import { UserDomainEntity } from "../../models/user-domain.entity";

export abstract class UserRepositoryInterface extends BaseRepositoryInterface<UserEntity,UserDomainEntity>{
    abstract findByEmail(email: string): Promise<UserDomainEntity | null>;
}