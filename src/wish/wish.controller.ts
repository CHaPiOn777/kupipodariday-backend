import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WishService } from './wish.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthUser } from 'src/common/decorators/user.decorators';
import { User } from 'src/users/entities/user.entity';

@Controller('wishes')
export class WishController {
  constructor(private readonly wishService: WishService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createWishDto: CreateWishDto, @AuthUser() user: User) {
    return this.wishService.create(createWishDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.wishService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post(':wishId/copy')
  async copyWish(@Param('wishId') wishId: number, @AuthUser() user: User) {
    return this.wishService.copyWishById(wishId, user);
  }

  @Get('last')
  findLast() {
    return this.wishService.findLast();
  }

  @Get('top')
  findTop() {
    return this.wishService.findPopulate();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @AuthUser() user: User) {
    return this.wishService.remove(id, user);
  }
}
