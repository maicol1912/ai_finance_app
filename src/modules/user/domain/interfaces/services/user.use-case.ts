import { CreateUserDto } from "@app/modules/user/api/http/dto/create-user.dto";
import { UserDomainEntity } from "../../models/user-domain.entity";

export abstract class UserUseCase {
    abstract createUser(createUserDto: CreateUserDto): Promise<void>
    abstract findUserById(id:string) :Promise< UserDomainEntity | null>
}