import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthUser } from 'src/common/decorators/user.decorators';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Wish } from 'src/wish/entities/wish.entity';
import { WishService } from 'src/wish/wish.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishesService: WishService,
  ) {}

  @Get('me')
  async findOwn(@AuthUser() user: User): Promise<User> {
    return this.usersService.findOne({
      where: { id: user.id },
      select: {
        email: true,
        username: true,
        id: true,
        avatar: true,
        about: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  @Patch('me')
  async updateUser(
    @AuthUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(user.id, updateUserDto);
  }

  @Get('me/wishes')
  async getWishes(@AuthUser() user: User): Promise<Wish[]> {
    return await this.wishesService.findMyWishes(user.id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':username')
  async findUser(@Param('username') username: string): Promise<User> {
    return this.usersService.findOne({
      where: { username },
      select: {
        email: true,
        username: true,
        id: true,
        avatar: true,
        about: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  @Get(':username/wishes')
  async findUserWishes(@Param('username') username: string): Promise<Wish[]> {
    return this.wishesService.wishAllByUsername(username);
  }

  @Post('find')
  async findAll(@Body() item: { query: string }) {
    return this.usersService.findAll(item.query);
  }
}
