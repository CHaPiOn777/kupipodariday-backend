import { IsDateString, IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUrl, MaxLength, MinLength } from "class-validator";
import { Unique } from "typeorm";

export class CreateUserDto {
  @IsString()
  @MinLength(1, { message: 'Вы ввели слишком мало символов' })
  @MaxLength(64, { message: 'Вы ввели слишком много символов' })
  @IsNotEmpty({ message: 'Обязательное поле для заполнения'})
  username: string;

  @IsString()
  @MinLength(0, { message: 'Вы ввели слишком мало символов' })
  @MaxLength(200, { message: 'Вы ввели слишком много символов' })
  about: string;

  @IsString()
  @IsUrl(undefined, { message: 'Нужно передать URL' })
  avatar: string;

  @IsStrongPassword()
  @IsNotEmpty({ message: 'Обязательное поле для заполнения'})
  password: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Обязательное поле для заполнения'})
  email: string;

  @IsDateString()
  @IsNotEmpty({ message: 'Обязательное поле для заполнения'})
  createDt: Date;

  @IsDateString()
  @IsNotEmpty({ message: 'Обязательное поле для заполнения'})
  updateAt: Date
}
