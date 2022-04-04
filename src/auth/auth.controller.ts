import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignDto, AuthLoginDto, AuthActivate } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('singup')
  singup(@Body() dto: AuthSignDto) {
    return this.authService.singup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: AuthLoginDto) {
    return this.authService.login(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('activate')
  activate(@Query() dto: AuthActivate) {
    return this.authService.activate(dto.token);
  }
}
