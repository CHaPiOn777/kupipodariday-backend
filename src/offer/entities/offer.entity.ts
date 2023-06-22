import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wish/entities/wish.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.id)
  user: User[];

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column({ scale: 2 })
  amount: number;

  @Column({
    scale: 2,
    default: false,
  })
  hidden: boolean;
}
