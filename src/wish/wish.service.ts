import { User } from './../users/entities/user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { FindManyOptions, Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Offer } from 'src/offer/entities/offer.entity';

@Injectable()
export class WishService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
    private readonly usersService: UsersService,
  ) {}

  async create(createWishDto: CreateWishDto, user: User): Promise<Wish> {
    const wish = this.wishRepository.create({ ...createWishDto, owner: user });
    return await this.wishRepository.save(wish);
  }

  async createPriceWish(
    createWishDto: CreateWishDto,
    amount: number,
    offer: Offer,
    id: number,
  ): Promise<Wish> {
    const wish = await this.findOne(id);
    const updateWish = this.wishRepository.create({
      ...createWishDto,
      offers: [...wish.offers, offer],
      raised: wish.raised + amount,
    });
    return await this.wishRepository.save(updateWish);
  }

  async findAll(): Promise<Wish[]> {
    const wishes = await this.wishRepository.find();
    return wishes;
  }

  async findMyWishes(id: number): Promise<Wish[]> {
    const wishes = await this.wishRepository.find({
      where: { owner: { id } },
      relations: ['owner'],
    });
    return wishes;
  }

  async findOne(wishId: number): Promise<Wish> {
    const wish = await this.wishRepository.findOneOrFail({
      where: { id: wishId },
      relations: {
        owner: true,
        offers: true,
      },
    });
    return wish;
  }

  async findWishList(wishId: number[]): Promise<Wish[]> {
    const wishes = wishId.map((id) => {
      const wish = new Wish();
      wish.id = id;

      return wish;
    });
    return wishes;
  }

  async findLast(): Promise<Wish[]> {
    const options: FindManyOptions<Wish> = {
      order: { id: 'DESC' },
      take: 40,
      skip: 0,
    };
    const [data] = await this.wishRepository.findAndCount(options);

    return data;
  }

  async copyWishById(wishId: number, user: User): Promise<Wish> {
    const wish = await this.findOne(wishId);
    const copyWish = this.wishRepository.create({
      ...wish,
      owner: user,
      raised: 0,
    });
    const originalWish = this.wishRepository.create({
      ...wish,
      copied: wish.copied + 1,
    });
    await this.wishRepository.insert(copyWish);
    return await this.wishRepository.save(originalWish);
  }

  async wishAllByUsername(username: string): Promise<Wish[]> {
    const wish = await this.wishRepository.find({
      where: { owner: { username } },
      relations: {
        owner: true,
      },
    });

    return wish;
  }

  async findPopulate(): Promise<Wish[]> {
    const options: FindManyOptions<Wish> = {
      order: { copied: 'DESC' },
      take: 10,
      skip: 0,
    };
    const [data] = await this.wishRepository.findAndCount(options);
    return data;
  }

  async remove(id: number, user: User) {
    const wish = await this.findOne(id);
    if (user.id !== wish.owner.id) {
      throw new ConflictException(
        'Удалить список подарков может только создавший его пользователь',
      );
    }
    if (wish.raised === 0) {
      return await this.wishRepository.remove(wish);
    } else {
      throw new ConflictException('rised is not null');
    }
  }
}
