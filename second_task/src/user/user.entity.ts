import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Genders } from '../types';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number = 1;

  @Column()
  first_name: string = '';

  @Column()
  last_name: string = '';

  @Column()
  age: number = 18;

  @Column()
  gender: Genders = Genders.MALE;

  @Column({ default: false })
  troubles: boolean = false;
}
