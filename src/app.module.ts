import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { User } from './users/entities/user.entity';
import { WishModule } from './wish/wish.module';
import { Wish } from './wish/entities/wish.entity';
import { WishlistModule } from './wishlist/wishlist.module';
import { OfferModule } from './offer/offer.module';
import { Wishlist } from './wishlist/entities/wishlist.entity';
import { Offer } from './offer/entities/offer.entity';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'student',
    password: 'student',
    database: 'kupipodariday',

    entities: [User, Wish, Wishlist, Offer],

    synchronize: true,
  }), WishModule, WishlistModule, OfferModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
