import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { ErrorResponse, LoginResponse } from './types/reponse.types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Post('signin')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<LoginResponse | ErrorResponse> {
    return this.usersService.loginUser(
      loginUserDto.email,
      loginUserDto.password,
    );
  }

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(
      createUserDto.email,
      createUserDto.password,
      createUserDto.name,
    );
  }
}
