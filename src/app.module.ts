import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { WishModule } from './wish/wish.module';
import { Wish } from './wish/entities/wish.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'student',
    password: 'student',
    database: 'kupipodariday',

    entities: [User, Wish],

    synchronize: true,
  }), WishModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
