import { hash, compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordHasher {
  async createPasswordHash(password: string): Promise<string> {
    return hash(password, parseInt(process.env.SALT));
  }

  async verifyPasswordHash(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return compare(password, passwordHash);
  }
}
