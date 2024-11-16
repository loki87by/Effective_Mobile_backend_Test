import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async resetTroubles(): Promise<number> {
    const usersWithTroubles = await this.usersRepository.count({
      where: { troubles: true },
    });

    await this.usersRepository.update({ troubles: true }, { troubles: false });

    return usersWithTroubles;
  }

  async deleteAllUsers(): Promise<void> {
    await this.usersRepository.clear();
  }
}
