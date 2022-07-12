import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';

@Controller('time')
export class TimeController {
  @UseGuards(JwtAuthGuard)
  @Get('now')
  async getTime(): Promise<string> {
    return new Date().toISOString();
  }
}
