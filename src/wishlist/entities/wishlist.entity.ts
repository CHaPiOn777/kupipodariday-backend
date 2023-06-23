import { MinLength, MaxLength, IsFQDN } from 'class-validator';
import { BaseEntity } from 'src/helpers/baseEntity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wish/entities/wish.entity';
import { Entity, Column, ManyToMany, ManyToOne, JoinTable } from 'typeorm';

@Entity()
export class Wishlist extends BaseEntity {
  @Column({ unique: true })
  @MinLength(1, {
    message: 'Title is too short',
  })
  @MaxLength(200, {
    message: 'Title is too long',
  })
  name: string;

  @Column()
  @IsFQDN()
  image: string;

  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];

  @ManyToOne(() => User, (user) => user.wishlists)
  @JoinTable()
  owner: User;
}
