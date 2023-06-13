import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSubCtgDto {
  @IsString()
  @MinLength(3)
  readonly name: string;

  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  readonly categoryId: string;

  readonly imgUrl: string;
}