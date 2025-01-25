import { UserService } from '@app/modules/user/application/services/user.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserUseCase } from '@app/modules/user/domain/interfaces/services/user.use-case';


@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserUseCase,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Get('gretting')
  async gretting(@Body() createUserDto: CreateUserDto): Promise<any> {
    return {name: 'Hola'}
  }

  
}