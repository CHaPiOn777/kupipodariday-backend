import { MinLength, MaxLength, IsFQDN, IsNotEmpty } from 'class-validator';
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
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsFQDN()
  link: string;

  @Column()
  @IsNotEmpty()
  @IsFQDN()
  image: string;

  @Column({scale: 2})
  @IsNotEmpty()
  price: number;

  @Column({scale: 2, nullable: true})
  rised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  @JoinColumn({ name: 'userId' })
  owner: User;

  @Column()
  @IsNotEmpty()
  @MinLength(1, {
    message: 'Title is too short',
  })
  @MaxLength(1024, {
    message: 'Title is too long',
  })
  description: string;

  @Column("simple-array", { nullable: true } )
  offers: string[];
  
  @Column({scale: 2, nullable: true})
  copied: number;
}
