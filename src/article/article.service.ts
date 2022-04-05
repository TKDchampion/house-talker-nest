import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as moment from 'moment-timezone';
import { Article } from '@prisma/client';
import { ArticleDto } from './dto';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}
  async create(userId: number, dto: ArticleDto) {
    const user = await this.prisma.article.create({
      data: {
        userId,
        timeTw: moment(new Date())
          .tz('Asia/Taipei')
          .format('YYYY/MM/DD HH:mm:ss'),
        ...dto,
      },
    });

    return user;
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
    userId: number,
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
    if (article.userId !== userId) {
      throw new UnauthorizedException('Access to resources denied');
    }

    const newArticle = await this.prisma.article.update({
      where: {
        id: article.id,
      },
      data: {
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
    article.forEach((item) => delete item.content);

    return article;
  }

  async getDetailById(articleId: number): Promise<Article> {
    const article = await this.prisma.article.findUnique({
      where: {
        id: articleId,
      },
    });
    return article;
  }
}
