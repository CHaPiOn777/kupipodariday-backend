import { MinLength, MaxLength, IsFQDN } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true })
  user: number;

  @Column()
  @IsFQDN()
  item: string;
  
  @Column({scale: 2})
  amount: number;

  @Column({
    scale: 2,
    default: false
  })
  hidden: boolean;
}

