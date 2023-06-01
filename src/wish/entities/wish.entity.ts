import { IsEmail, MinLength, MaxLength, IsFQDN } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  @IsFQDN()
  link: string;

  @Column()
  @IsFQDN()
  image: string;

  @Column({scale: 2})
  price: number;

  @Column({scale: 2})
  rised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  @JoinColumn({ name: 'user.id' })
  owner: User;

  @Column()
  @MinLength(1, {
    message: 'Title is too short',
  })
  @MaxLength(1024, {
    message: 'Title is too long',
  })
  description: string;

  @Column("simple-array")
  offers: string[];
  
  @Column({scale: 2})
  copied: number;
}
