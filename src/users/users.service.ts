import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // to get user by id
  async getUserById(userId: string): Promise<User> {
    return await this.usersRepository.findOne({ userId });
  }

  // to get all the users in the database
  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  // creating the user
  async createUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      throw new BadRequestException('User already Signed up.');
    }
    // generating salt for encryption
    const salt = await bcrypt.genSalt();
    // hashing password
    const encryptedPassword = await this.hashPassword(password, salt);
    // saving the user
    return this.usersRepository.create({
      userId: uuidv4(),
      email: email,
      encryptedPassword: encryptedPassword,
      salt: salt,
      createdAt: `${new Date()}`,
      updatedAt: null,
    });
  }

  // authenticating the user
  async loginUser(email: string, password: string): Promise<any> {
    // getting the user
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      // if correct password
      const hash = await bcrypt.hash(password, user.salt);
      if (user.encryptedPassword === hash) {
        return { statusCode: 200, message: 'correct password!' };
      }
      // incorrect password
      return { statusCode: 400, errorMessage: 'Wrong Password!' };
    }
    // if user is doesn't exists
    throw new BadRequestException('user already exists.');
  }

  // helper method to hash the user password
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
