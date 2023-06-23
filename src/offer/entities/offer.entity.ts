import { IsBoolean, IsNumber } from 'class-validator';
import { BaseEntity } from 'src/helpers/baseEntity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wish/entities/wish.entity';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Offer extends BaseEntity {
  @OneToMany(() => User, (user) => user.id)
  user: User[];

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column({ scale: 2 })
  @IsNumber()
  amount: number;

  @Column({
    scale: 2,
    default: false,
  })
  @IsBoolean()
  hidden: boolean;
}
