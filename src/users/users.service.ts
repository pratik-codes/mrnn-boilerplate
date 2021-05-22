import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ErrorResponse, LoginResponse } from './types/reponse.types';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  // to get user by id
  async getUserById(userId: string): Promise<User> {
    return await this.usersRepository.findOne({ userId });
  }

  // to get all the users in the database
  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  // creating the user
  async createUser(
    email: string,
    password: string,
    name: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      throw new BadRequestException('User already Signed up.');
    }
    // generating salt for encryption
    const salt = await bcrypt.genSalt();
    // hashing password
    const encryptedPassword = await this.hashPassword(password, salt);
    // saving the user
    let date = `${new Date()}`;
    date = date.split('GMT')[0];
    return this.usersRepository.create({
      userId: uuidv4(),
      name: name,
      email: email,
      encryptedPassword: encryptedPassword,
      salt: salt,
      createdAt: date,
      updatedAt: null,
    });
  }

  // authenticating the user
  async loginUser(
    email: string,
    password: string,
  ): Promise<LoginResponse | ErrorResponse> {
    // getting the user
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      // if correct password
      // creating payload
      const payload = {
        name: user.name,
        email: user.email,
      };
      // generating accessToken
      const accessToken = await this.jwtService.sign(payload, {
        secret: 'zxa234s31s434m3uasdasdasda3b463bn383342',
        expiresIn: '120d',
      });

      // hashing the password
      const hash = await bcrypt.hash(password, user.salt);
      if (user.encryptedPassword === hash) {
        return {
          statusCode: 200,
          message: 'correct password!',
          data: { accessToken: accessToken },
        };
      }
      // incorrect password
      return { statusCode: 400, error: 'Wrong Password!' };
    }
    // id user doesn't exists
    throw new BadRequestException('user doesnt exists.');
  }

  // helper method to hash the user password
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
