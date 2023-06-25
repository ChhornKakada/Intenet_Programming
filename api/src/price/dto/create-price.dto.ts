import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class createPriceDto {
  @IsNumber()
  readonly price: number;

  @IsString()
  readonly store: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  readonly productId: string;
}