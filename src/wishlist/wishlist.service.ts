import { WishService } from './../wish/wish.service';
import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { In, Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WishlistService {
  constructor (
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    private readonly wishService: WishService,
  ) {}

  async create(createWishlistDto: CreateWishlistDto) {
    const { itemsId } = createWishlistDto;
    // const wishes = itemsId.map(id => {
    //   let wish = this.wishService.findOne(id);
    //   return wish
    // })
    const wishes = await this.wishService.findWishList(itemsId);
    console.log(wishes)
    const wishlist = this.wishlistRepository.create({...createWishlistDto, items: wishes});
    const { id } = wishlist;
    console.log(id)
    await this.wishlistRepository.save(wishlist);
    return this.wishService.findOne(id);
  }


  
  async findAll() {
    return await this.wishlistRepository.find();
  }

  async findOne(id: number) {
    return await this.wishlistRepository.findOne({where: { id }});
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}
