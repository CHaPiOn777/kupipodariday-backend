import { AuthUser } from './../common/decorators/user.decorators';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('wishlistlists')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  create(@Body() createWishlistDto: CreateWishlistDto, @AuthUser() user: User) {
    return this.wishlistService.create(createWishlistDto, user);
  }

  @Get()
  findAll() {
    return this.wishlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishlistService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @AuthUser() user: User) {
    return this.wishlistService.remove(id, user);
  }
}
