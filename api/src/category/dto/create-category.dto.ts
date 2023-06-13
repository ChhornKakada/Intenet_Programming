import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategroyDto {
  @IsString()
  @MinLength(3)
  readonly name: string;

  @MinLength(6)
  readonly description: string;

  readonly imgUrl: string;
}