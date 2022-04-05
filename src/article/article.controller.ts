import { User } from '@prisma/client';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ArticleService } from './article.service';
import { ArticleDto } from './dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  create(@GetUser() user: User, @Body() dto: ArticleDto) {
    return this.articleService.create(user, dto);
  }

  @UseGuards(JwtGuard)
  @Get('getByUser')
  getByUser(@GetUser('id') userId: number) {
    return this.articleService.getByUser(userId);
  }

  @UseGuards(JwtGuard)
  @Patch('update/:id')
  update(
    @GetUser() user: User,
    @Body() articleDto: ArticleDto,
    @Param('id', ParseIntPipe) articleId: number,
  ) {
    return this.articleService.update(user, articleDto, articleId);
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  delete(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) articleId: number,
  ) {
    return this.articleService.delete(userId, articleId);
  }

  @Get('getAllNews')
  getAllNews() {
    return this.articleService.getAllNews();
  }

  @Get('getDetailById/:id')
  getDetailById(@Param('id', ParseIntPipe) articleId: number) {
    return this.articleService.getDetailById(articleId);
  }
}
