import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WishModule } from './wish/wish.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { OfferModule } from './offer/offer.module';
import { AppController } from './app.controller';
import configuration from './config/configuration';
import { DBConfigFactory } from './config/DB-config.factory';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DBConfigFactory,
    }),
    UsersModule,
    WishModule,
    WishlistModule,
    OfferModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
