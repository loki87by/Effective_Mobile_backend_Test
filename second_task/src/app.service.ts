import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getNotFound(): string {
    return 'Такого эндпоинта не существует или используется неверный метод.';
  }
}
