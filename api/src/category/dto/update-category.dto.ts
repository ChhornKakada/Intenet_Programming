import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateCategroyDto {

  readonly name: string;
  readonly description: string;
  readonly imgUrl: string;
}