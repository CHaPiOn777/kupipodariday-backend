import { WishService } from './../wish/wish.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly wishService: WishService,
  ) {}

  async create(createOfferDto: CreateOfferDto, user: User): Promise<Offer> {
    const { amount, itemId } = createOfferDto;
    const wish = await this.wishService.findOne(itemId);
    const offer = this.offerRepository.create({
      ...createOfferDto,
      user: [user],
      item: wish,
    });
    const sum = wish.raised + amount;
    if (wish.owner.id === user.id) {
      throw new ConflictException('Вы не можете скидываться на свой подарок');
    }
    if (sum > wish.price) {
      throw new ConflictException('сумма поддержки больше цены');
    } else {
      await this.wishService.createPriceWish(wish, amount, offer, wish.id);
    }
    return await this.offerRepository.save(offer);
  }

  async findAll(): Promise<Offer[]> {
    return await this.offerRepository.find();
  }

  async findOne(id: number): Promise<Offer> {
    return await this.offerRepository.findOne({ where: { id } });
  }
}
