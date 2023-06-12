import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { hashValue } from 'src/helpers/hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User> 
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const user = await this.userRepository.create({
      ...createUserDto,
      password: await hashValue(password)
    })
    return this.userRepository.save(user)
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(query: FindOneOptions<User>) {
    return await this.userRepository.findOneOrFail(query)
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
    const user = await this.findById(id);
    if (password) {
      updateUserDto.password = await hashValue(password);
    }

    return this.userRepository.save({ ...user, ...updateUserDto })
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
