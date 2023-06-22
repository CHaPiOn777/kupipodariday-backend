import { Module, forwardRef } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from 'src/wish/entities/wish.entity';
import { User } from 'src/users/entities/user.entity';
import { Offer } from './entities/offer.entity';
import { AuthModule } from 'src/auth/auth.module';
import { WishModule } from 'src/wish/wish.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wish, User, Offer]),
    forwardRef(() => AuthModule),
    forwardRef(() => WishModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [OfferController],
  providers: [OfferService],
})
export class OfferModule {}
