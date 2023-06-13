import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { verifyHash } from 'src/helpers/hash';

@Injectable()
export class AuthService {
  constructor (
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  auth(user: User) {
    const payload = { sub: user.id };

    return { acces_token: this.jwtService.sign(payload) }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({
      select: { username: true, password: true, id: true },
      where: { username: username }
    });

    if (user && (await verifyHash(password, user.password))) {
      const { password, ...result } = user;
      return result
    }
    return null
  };


  async login(user: User) {
    const { username, id: sub } = user;
console.log(user)

    return {
      access_token: await this.jwtService.signAsync({ username, sub})
    }
  }
}