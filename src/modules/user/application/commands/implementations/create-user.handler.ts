import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepositoryInterface } from '@app/modules/user/domain/interfaces/repositories/user-repository.interface';
import { CreateUserCommand } from '../handlers/create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly userRepository: UserRepositoryInterface,
    ) {}

    async execute(command: CreateUserCommand): Promise<void> {
        const { user } = command;
        await this.userRepository.save(user);
    }
}