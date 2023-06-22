import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory } from '@nestjs/jwt';
import { JwtModuleOptions } from '@nestjs/jwt/dist';

@Injectable()
export class JwtConfigFactory implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}
  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      secret: this.configService.get<string>('jwt.secret'),
      signOptions: {
        expiresIn: this.configService.get<string>('jwt.ttl', '300s'),
      },
    };
  }
}
