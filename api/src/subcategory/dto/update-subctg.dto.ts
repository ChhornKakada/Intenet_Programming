import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateSubCtgDto {
  readonly name: string;
  readonly description: string;
  readonly categoryId: string;
  readonly imgUrl: string;
}