import { WishService } from './../wish/wish.service';
import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { Wish } from 'src/wish/entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly wishService: WishService
  ) {}

  async create(createOfferDto: CreateOfferDto, user: User) {
    const { amount, hidden, itemId } = createOfferDto;

    let wish = await this.wishService.findOne(itemId);
    let offer;
    if (wish.price > amount) {
      offer = this.offerRepository.create({...createOfferDto, user: [user]});
      const updateWish = await this.wishService.createOffer(wish, offer);
    }
    return await this.offerRepository.save(offer)
  }

  findAll() {
    return `This action returns all offer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} offer`;
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}
