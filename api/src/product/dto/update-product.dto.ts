import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateProductDto {
  readonly name: string;

  readonly description: string;

  readonly categoryId: string;

  readonly subctgId: string;

  readonly imgUrl: string;
}