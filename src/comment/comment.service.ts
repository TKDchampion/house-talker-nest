import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Comment, User } from '@prisma/client';
import * as moment from 'moment-timezone';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentCreateDto, CommentUpdateDto } from './dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(user: User, dto: CommentCreateDto): Promise<Comment> {
    const article = await this.prisma.article.findUnique({
      where: {
        id: dto.articleId,
      },
    });

    if (!article) {
      throw new ForbiddenException('Credntials incorrect');
    }

    const comment = await this.prisma.comment.create({
      data: {
        ...dto,
        userId: user.id,
        nickName: user.nickName,
        timeTw: moment(new Date())
          .tz('Asia/Taipei')
          .format('YYYY/MM/DD HH:mm:ss'),
      },
    });
    return comment;
  }

  async update(userId: number, dto: CommentUpdateDto, commentId: number) {
    const comment = await this.prisma.comment.findFirst({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      throw new ForbiddenException('Credntials incorrect');
    }
    if (comment.userId !== userId) {
      throw new UnauthorizedException('Access to resources denied');
    }

    const newComment = await this.prisma.comment.update({
      where: {
        id: comment.id,
      },
      data: {
        ...dto,
        timeTw: moment(new Date())
          .tz('Asia/Taipei')
          .format('YYYY/MM/DD HH:mm:ss'),
      },
    });
    return newComment;
  }

  async delete(userId: number, commentId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      throw new ForbiddenException('Credntials incorrect');
    }
    if (comment.userId !== userId) {
      throw new UnauthorizedException('Access to resources denied');
    }

    await this.prisma.comment.delete({
      where: {
        id: comment.id,
      },
    });
  }

  async getListByArticle(articleId: number): Promise<Comment[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        articleId,
      },
    });
    comments.forEach((item) => {
      if (item.isHiddenName) {
        item.nickName = '匿名';
      }
    });
    return comments;
  }
}
