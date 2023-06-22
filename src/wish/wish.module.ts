import { Module, forwardRef } from '@nestjs/common';
import { WishService } from './wish.service';
import { WishController } from './wish.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { OfferModule } from 'src/offer/offer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wish, User]),
    forwardRef(() => OfferModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [WishController],
  providers: [WishService],
  exports: [WishService],
})
export class WishModule {}
