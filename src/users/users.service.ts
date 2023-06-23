import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Like, Repository } from 'typeorm';
import { hashValue } from 'src/helpers/hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const user = this.userRepository.create({
      ...createUserDto,
      password: await hashValue(password),
    });
    return this.userRepository.save(user);
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    return user;
  }

  async findAll(query: string): Promise<User[]> {
    let users: User[] | PromiseLike<User[]>;
    if (query) {
      users = await this.userRepository.find({
        where: [
          { username: Like(`%${query}%`) },
          { email: Like(`%${query}%`) },
        ],
      });
    } else {
      users = await this.userRepository.find();
    }

    return users;
  }

  async findOne(query: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOneOrFail(query);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { password } = updateUserDto;
    const user = await this.findById(id);
    if (password) {
      updateUserDto.password = await hashValue(password);
    }

    return this.userRepository.save({ ...user, ...updateUserDto });
  }
}
