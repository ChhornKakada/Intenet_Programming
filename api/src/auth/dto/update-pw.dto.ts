import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePwDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly passwordComfirm: string;
}