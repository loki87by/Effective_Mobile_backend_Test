import { Controller, All, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All()
  @HttpCode(404)
  getNotFound(): string {
    return this.appService.getNotFound();
  }
}
