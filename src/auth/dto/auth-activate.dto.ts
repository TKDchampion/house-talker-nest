import { IsNotEmpty, IsString } from 'class-validator';

export class AuthActivate {
  @IsString()
  @IsNotEmpty()
  token: string;
}
