import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Обязательное поле для заполнения' })
  amount: number;

  @IsBoolean()
  hidden: boolean;

  @IsNotEmpty({ message: 'Обязательное поле для заполнения' })
  @IsNumber()
  itemId: number;
}
