import { Exclude } from 'class-transformer';
import {
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsUrl,
} from 'class-validator';
import { BaseEntity } from 'src/helpers/baseEntity';
import { Offer } from 'src/offer/entities/offer.entity';
import { Wish } from 'src/wish/entities/wish.entity';
import { Wishlist } from 'src/wishlist/entities/wishlist.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  @IsNotEmpty()
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
  @IsUrl()
  avatar: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  @Exclude()
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
