import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { User, UserSchema } from './schemas/user.schema';
import { PasswordHasher } from './helpers/password.hasher';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, UsersRepository, PasswordHasher],
  exports: [UsersService],
})
export class UsersModule {}
