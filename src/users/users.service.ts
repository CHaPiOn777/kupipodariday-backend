import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User> 
  ) {}
  
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(query: FindOptionsWhere<User>) {
    return await this.userRepository.findOneByOrFail(query)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
