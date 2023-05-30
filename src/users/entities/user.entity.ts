import { IsEmail, MinLength, MaxLength, IsFQDN } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true })
  @MinLength(2, {
    message: 'Title is too short',
  })
  @MaxLength(30, {
    message: 'Title is too long',
  })
  username: string;

  @Column({
    default: 'Пока ничего не рассказал о себе',
  })
  @MinLength(2, {
    message: 'Title is too short',
  })
  @MaxLength(200, {
    message: 'Title is too long',
  })
  about: string;

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  @IsFQDN()
  avatar: string;
  
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  wishes: string;

  @Column()
  offers: string;

  @Column()
  wishlist: string;
}
