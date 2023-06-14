import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthUser } from 'src/common/decorators/user.decorators';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
        updateAt: true,
      },
    });
  }

  @Patch('me')
  async updateUser(@AuthUser() user: User): Promise<User> {
    return await this.usersService.update(user.id, user);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Get(':username')
  async findUser(@Param('username') username: string): Promise<User> {
    return this.usersService.findOne({
      where: { username},
      select: {
        email: true,
        username: true,
        id: true,
        avatar: true,
        about: true,
        createdAt: true,
        updateAt: true,
      },
    });
  }
  
  @Post('find')
  async findAll(@Body() item: { query: string }) {
    return this.usersService.findAll(item.query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.usersService.findOne(id);
  // }
}
