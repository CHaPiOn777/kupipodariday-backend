import { User } from './../users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WishService {

  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
    private readonly usersService: UsersService,
  ) {}

  async create(createWishDto: CreateWishDto, user: User) {
    const owner = await this.usersService.findById(user.id)
    const wishes = this.wishRepository.create({ ...createWishDto, owner });
    return this.wishRepository.save(wishes);
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

  async findOne(id: number) {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: {
        owner: true
      }
    });
    console.log(wish)
    return wish
  }

  async findLast() {
    const options: FindManyOptions<Wish> = {
      order: { id: 'DESC' },
      take: 40,
      skip: 0
    }
    const [data] = await this.wishRepository.findAndCount(options);

    return data
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

  remove(id: number) {

    return `This action removes a #${id} wish`;
  }
}
