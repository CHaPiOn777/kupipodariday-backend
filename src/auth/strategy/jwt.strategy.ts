
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret')
    })
  };

  validate(payload: User) {
    const user = this.usersService.findById(payload.id);
    if (!user) {
      throw new UnauthorizedException(
        'Неверный логин или пароль пользователя'
      )
    }
    return user
  }
}