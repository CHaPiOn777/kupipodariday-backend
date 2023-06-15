import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Like, Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishService {

  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto, user: User) {
    console.log(user.id)
    const wishes = this.wishRepository.save({...createWishDto, userId: user.id});
    return wishes;
  }

  async findAll() {
    const wishes = await this.wishRepository.find();
    return wishes;
  }

  async findMyWishes(id: number) {
    const wishes = await this.wishRepository.find({ where: { id } });
    return wishes;
  }

  findOne(id: number) {
    return `This action returns a #${id} wish`;
  }

  update(id: number, updateWishDto: UpdateWishDto) {
    return `This action updates a #${id} wish`;
  }

  remove(id: number) {
    return `This action removes a #${id} wish`;
  }
}
