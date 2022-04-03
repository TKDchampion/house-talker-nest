import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserEditDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: UserEditDto) {
    return this.userService.editUser(userId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('userDeleteById/:id')
  deleteUserById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) userIdParam: number,
  ) {
    return this.userService.deleteUserById(userId, userIdParam);
  }
}
