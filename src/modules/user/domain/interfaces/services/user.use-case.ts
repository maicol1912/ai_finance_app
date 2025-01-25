import { CreateUserDto } from "@app/modules/user/api/http/dto/create-user.dto";

export abstract class UserUseCase {
    abstract createUser(createUserDto: CreateUserDto): Promise<void>
}