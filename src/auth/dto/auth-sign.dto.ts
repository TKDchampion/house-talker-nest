import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class AuthSignDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  activate?: boolean;

  @IsString()
  @IsNotEmpty()
  nickName: string;
}
