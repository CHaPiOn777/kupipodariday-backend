import { MinLength, MaxLength, IsFQDN } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true })
  @MinLength(1, {
    message: 'Title is too short',
  })
  @MaxLength(200, {
    message: 'Title is too long',
  })
  name: string;

  @Column({
    default: 'Пока ничего не рассказал о себе',
  })
  @MaxLength(1500, {
    message: 'Title is too long',
  })
  description: string;

  @Column()
  @IsFQDN()
  image: string;
  
  @Column("simple-array")
  items: string[];
}
