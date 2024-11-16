import { Controller, Get, Delete, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { createUsers } from '../migration/migration';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('troubleshooting')
  async resetTroubles(): Promise<{ count: number }> {
    const count = await this.userService.resetTroubles();
    return { count };
  }

  @Get('migration')
  async createUsers(): Promise<{ result: string }> {
    const result = await createUsers(false);
    return { result };
  }

  @Delete('genocide')
  @HttpCode(204)
  async removeAll(): Promise<void> {
    await this.userService.deleteAllUsers();
  }
}
