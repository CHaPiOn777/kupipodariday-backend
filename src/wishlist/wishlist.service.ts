import { WishService } from './../wish/wish.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    private readonly wishService: WishService,
  ) {}

  async create(
    createWishlistDto: CreateWishlistDto,
    user: User,
  ): Promise<Wishlist> {
    const { itemsId } = createWishlistDto;
    const wishes = itemsId.map((id) => {
      return this.wishService.findOne(id);
    });
    return await Promise.all(wishes).then((items) => {
      const wishlist = this.wishlistRepository.create({
        ...createWishlistDto,
        items,
        owner: user,
      });
      return this.wishlistRepository.save(wishlist);
    });
  }

  async findAll(): Promise<Wishlist[]> {
    return await this.wishlistRepository.find({
      relations: { owner: true },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Wishlist> {
    return await this.wishlistRepository.findOne({
      where: { id },
      relations: { items: true, owner: true },
    });
  }

  async remove(id: number, user: User) {
    const wishList = await this.findOne(id);
    if (wishList.owner.id === user.id) {
      return await this.wishlistRepository.remove(wishList);
    } else {
      throw new ConflictException(
        'Удалить список подарков может только создавший его пользователь',
      );
    }
  }
}
