import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true })); //преобразовывает типы налету, типизирует вход данные к тому типу которое указано после :
  await app.listen(PORT, () => console.log(`Сервер работает на ${PORT} порту`));
}
bootstrap();
