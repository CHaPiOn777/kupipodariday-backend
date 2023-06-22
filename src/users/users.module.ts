import { forwardRef } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Wish } from 'src/wish/entities/wish.entity';
import { WishModule } from 'src/wish/wish.module';
import { OfferModule } from 'src/offer/offer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Wish]),
    forwardRef(() => OfferModule),
    forwardRef(() => AuthModule),
    forwardRef(() => WishModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
