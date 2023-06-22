import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { AuthUser } from 'src/common/decorators/user.decorators';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  login(@AuthUser() user: User): Promise<any> {
    return this.authService.login(user);
  }

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.authService.login(user);
  }
}
