import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class updatePriceDto {
  readonly price: number;
  readonly store: string;
  readonly productId: string;
}