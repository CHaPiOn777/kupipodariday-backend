import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateWishDto {
  @IsString()
  @MinLength(1, { message: 'Вы ввели слишком мало символов' })
  @MaxLength(64, { message: 'Вы ввели слишком много символов' })
  @IsNotEmpty({ message: 'Обязательное поле для заполнения' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Обязательное поле для заполнения' })
  @IsUrl(undefined, { message: 'Нужно передать URL' })
  link: string;

  @IsString()
  @IsNotEmpty({ message: 'Обязательное поле для заполнения' })
  @IsUrl(undefined, { message: 'Нужно передать URL' })
  image: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Обязательное поле для заполнения' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: 'Обязательное поле для заполнения' })
  description: string;
}
