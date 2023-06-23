import { MinLength, MaxLength, IsFQDN, IsNotEmpty } from 'class-validator';
import { BaseEntity } from 'src/helpers/baseEntity';
import { Offer } from 'src/offer/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Wish extends BaseEntity {
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

  @Column({ scale: 2 })
  @IsNotEmpty()
  price: number;

  @Column({ scale: 2, default: 0 })
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  @JoinColumn()
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

  @OneToMany(() => Offer, (offer) => offer.item)
  @JoinColumn()
  offers: Offer[];

  @Column({ scale: 2, default: 0 })
  copied: number;
}
