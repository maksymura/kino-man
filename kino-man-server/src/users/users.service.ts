import { ulid } from 'ulid';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';
import { UsersRepository } from './users.repository';
import { PasswordHasher } from './helpers/password.hasher';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private passwordHasher: PasswordHasher,
  ) {}

  async findUserByEmail(email): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async createUser(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;

    const usersExists = !!(await this.findUserByEmail(email));

    if (usersExists) {
      throw new HttpException(
        'User with email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userId = ulid();
    const passwordHash = await this.passwordHasher.createPasswordHash(password);

    return this.usersRepository.create({
      userId,
      name,
      email,
      passwordHash,
    });
  }

  async verifyUserPassword(password: string, user: User) {
    if (
      !(await this.passwordHasher.verifyPasswordHash(
        password,
        user.passwordHash,
      ))
    ) {
      throw new HttpException(
        'Invalid login credentials',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
