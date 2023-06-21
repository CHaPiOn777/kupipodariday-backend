import { User } from './../users/entities/user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { FindManyOptions, Like, Repository, In } from 'typeorm';
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

  async create(createWishDto: CreateWishDto, user: User) {
    const wish = this.wishRepository.create({ ...createWishDto, owner: user });
    return await this.wishRepository.save(wish);
  }

  async createPriceWish(createWishDto: CreateWishDto, amount: number, offer: Offer, id: number) {
    const wish = await this.findOne(id)
    const updateWish = this.wishRepository.create({
      ...createWishDto,
      offers: [...wish.offers, offer],
      raised: wish.raised + amount
    })
    return await this.wishRepository.save(updateWish)
  }


  async findAll() {
    const wishes = await this.wishRepository.find();
    return wishes;
  }

  async findMyWishes(id: number) {
    const wishes = await this.wishRepository.find({ 
      where: { owner: { id }},
      relations: ['owner']
    });
    return wishes;
  }

  async findOne(wishId: number) {
    const wish = await this.wishRepository.findOne({
      where: { id: wishId },
      relations: {
        owner: true,
        offers: true
      }
    });
    return wish
  }


  async findWishList(wishId: number[]) {
    const wishes = wishId.map(id => {
      const wish = new Wish();
      wish.id = id;
      
      return wish;
    })
    return wishes
   
  }

  // async findOneArr(wishId: number[]) {
  //   const wish = await this.wishRepository.findOneBy({
  //     where: { id: wishId },
  //     relations: {
  //       owner: true,
  //       offers: true
  //     }
  //   });
  //   return wish
  // }

  // async findWishlistById(wishId: number[]): Promise<Wish[]> {
  //   const wish = 
  // }

  async findLast() {
    const options: FindManyOptions<Wish> = {
      order: { id: 'DESC' },
      take: 40,
      skip: 0
    }
    const [data] = await this.wishRepository.findAndCount(options);

    return data
  }

  async copyWishById(wishId: number, user: User) {
    const wish = await this.findOne(wishId);
    const copyWish = this.wishRepository.create({ ...wish, owner: user, raised: 0 });
    const originalWish = this.wishRepository.create({ ...wish, copied: wish.copied + 1});
    await this.wishRepository.insert(copyWish);
    return await this.wishRepository.save(originalWish); 
  }


  async wishAllByUsername( username: string ): Promise<Wish[]> {
    const wish = await this.wishRepository.find({
      where: { owner: { username } },
      relations: {
        owner: true
      },
    })

    return wish;
  }

  async findPopulate() {
    const options: FindManyOptions<Wish> = {
      order: { copied: 'DESC' },
      take: 20,
      skip: 0
    }
    const [data] = await this.wishRepository.findAndCount(options);

    return data
  }

  async update(id: number, updateWishDto: UpdateWishDto, userId: number) {
    // const wish = await this.wishRepository.findOne({userId});
    // console.log(wish)
  }

  async remove(id: number) {
    const wish = await this.findOne(id);
    if (wish.raised === 0) {
      return await this.wishRepository.remove(wish)
    } else {
      throw new ConflictException('rised is not null');
    }
  }
}
