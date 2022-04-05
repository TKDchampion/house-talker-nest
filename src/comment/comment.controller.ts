import { CommentService } from './comment.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CommentCreateDto, CommentUpdateDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  create(@GetUser() user: User, @Body() dto: CommentCreateDto) {
    return this.commentService.create(user, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('update/:id')
  update(
    @GetUser('id') userId: number,
    @Body() dto: CommentUpdateDto,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.update(userId, dto, commentId);
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  detlet(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.delete(userId, commentId);
  }

  @Get('getListByArticle/:id')
  getListByArticle(@Param('id', ParseIntPipe) articleId: number) {
    return this.commentService.getListByArticle(articleId);
  }
}
