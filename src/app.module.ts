import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { RouterModule, Routes } from 'nest-router';

const routes: Routes = [
  {
    path: '/api/v1',
    module: AuthModule,
  },
  {
    path: '/api/v1',
    module: ArticleModule,
  },
  {
    path: '/api/v1',
    module: CommentModule,
  },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    MailModule,
    ArticleModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
