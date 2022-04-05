import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as moment from 'moment-timezone';
import { Article, User } from '@prisma/client';
import { ArticleDto } from './dto';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}
  async create(user: User, dto: ArticleDto) {
    const createUser = await this.prisma.article.create({
      data: {
        userId: user.id,
        nickName: user.nickName,
        timeTw: moment(new Date())
          .tz('Asia/Taipei')
          .format('YYYY/MM/DD HH:mm:ss'),
        ...dto,
      },
    });

    return createUser;
  }

  async getByUser(userId: number): Promise<Article[]> {
    const article = await this.prisma.article.findMany({
      where: {
        userId,
      },
    });
    return article;
  }

  async update(
    user: User,
    articleDto: ArticleDto,
    articleId: number,
  ): Promise<Article> {
    const article = await this.prisma.article.findUnique({
      where: {
        id: articleId,
      },
    });

    if (!article) {
      throw new ForbiddenException('Credntials incorrect');
    }
    if (article.userId !== user.id) {
      throw new UnauthorizedException('Access to resources denied');
    }

    const newArticle = await this.prisma.article.update({
      where: {
        id: article.id,
      },
      data: {
        nickName: user.nickName,
        ...articleDto,
      },
    });
    return newArticle;
  }

  async delete(userId: number, articleId: number) {
    const article = await this.prisma.article.findUnique({
      where: {
        id: articleId,
      },
    });

    if (!article) {
      throw new ForbiddenException('Credntials incorrect');
    }
    if (article.userId !== userId) {
      throw new UnauthorizedException('Access to resources denied');
    }

    await this.prisma.article.delete({
      where: {
        id: article.id,
      },
    });
  }

  async getAllNews(): Promise<Article[]> {
    const article = await this.prisma.article.findMany();
    article.forEach((item) => {
      if (item.isHiddenName) {
        item.nickName = '匿名';
      }
      delete item.content;
    });

    return article;
  }

  async getDetailById(articleId: number): Promise<Article> {
    const article = await this.prisma.article.findUnique({
      where: {
        id: articleId,
      },
    });
    if (article.isHiddenName) {
      article.nickName = '匿名';
    }
    return article;
  }
}
