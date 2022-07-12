import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TimeModule } from './time/time.module';

const validationSchema = Joi.object({
  PORT: Joi.number().required(),
  SALT: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION_TIME: Joi.string().required(),
  MONGO_DB_PATH: Joi.string().required(),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_PATH),
    AuthModule,
    TimeModule,
  ],
})
export class AppModule {}
