import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthLoginDto, AuthSignDto, AuthTokenInfo } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async singup(dto: AuthSignDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: dto.password,
          nickName: dto.nickName,
          activate: false,
        },
      });
      return this.createToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('帳號或暱稱已存在');
        } else {
          throw error;
        }
      }
    }
  }

  async login(dto: AuthLoginDto): Promise<AuthTokenInfo> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Credntials incorrect');
    }
    const pwMatches = user.password === dto.password;
    if (!pwMatches) {
      throw new ForbiddenException('Credntials incorrect');
    }

    return {
      access_token: await this.createToken(user.id, user.email),
      email: user.email,
      nickName: user.nickName,
      userId: user.id,
    };
  }

  async createToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: secret,
    });
    return token;
  }
}
