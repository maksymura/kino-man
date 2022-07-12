import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { GetServerTimeResponse } from './interfaces/get.server.time.response';

@Controller('time')
export class TimeController {
  @UseGuards(JwtAuthGuard)
  @Get('now')
  async getTime(): Promise<GetServerTimeResponse> {
    return { serverTime: new Date().toISOString() };
  }
}
