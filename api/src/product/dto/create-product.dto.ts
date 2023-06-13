import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  readonly name: string;

  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  readonly categoryId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  readonly subctgId: string;

  readonly imgUrl: string;
}