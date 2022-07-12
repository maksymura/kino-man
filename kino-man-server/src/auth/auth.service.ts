import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { DecodedToken } from './interfaces/decoded.token';
import { RegisterResponse } from './interfaces/register.response';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;
    this.logger.log(`Received login input ${JSON.stringify(loginDto)}`);

    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new HttpException('User does not exits', HttpStatus.BAD_REQUEST);
    }

    await this.userService.verifyUserPassword(password, user);
    this.logger.log(`Verified user password`);

    const decodedToken: DecodedToken = {
      userId: user.userId,
      name: user.name,
      email: user.email,
    };

    const token = this.jwtService.sign(decodedToken);
    this.logger.log(`Created token`);

    return token;
  }

  async register(registerDto: RegisterDto): Promise<RegisterResponse> {
    this.logger.log(`Received register input ${JSON.stringify(registerDto)}`);
    await this.userService.createUser(registerDto);
    this.logger.log(`Created user`);

    return { message: 'Created' };
  }
}
