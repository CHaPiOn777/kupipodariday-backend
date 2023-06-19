import { IsDateString, IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUrl, Length, MaxLength, MinLength } from "class-validator";
import { Unique } from "typeorm";

export class CreateUserDto {
  @IsString()
  @Length(1, 25)
  @IsNotEmpty({ message: 'Обязательное поле для заполнения'})
  username: string;

  @IsString()
  @Length(0, 200)
  about: string;

  @IsString()
  @IsUrl(undefined, { message: 'Нужно передать URL' })
  avatar: string;

  // @IsStrongPassword()
  @IsNotEmpty({ message: 'Обязательное поле для заполнения'})
  password: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Обязательное поле для заполнения'})
  email: string;

}
