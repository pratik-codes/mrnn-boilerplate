const Cryptr = require('cryptr');

import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: string): Promise<User> {
    return await this.usersRepository.findOne({ userId });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async createUser(email: string, password: string): Promise<User> {
    const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
    const encryptedPassword: string = cryptr.encrypt(password);
    return this.usersRepository.create({
      userId: uuidv4(),
      email,
      encryptedPassword,
    });
  }
  async loginUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
      const decryptedPassword = cryptr.decrypt(password);
      console.log(password, decryptedPassword);
      console.log(user.encryptedPassword);
      if (user.encryptedPassword === decryptedPassword) {
        return { statusCode: 200, message: 'correct password!' };
      }
    }
    return { statusCode: 400, errorMessage: 'Wrong Password!' };
  }
}
