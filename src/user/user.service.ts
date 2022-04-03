import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEditDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async editUser(userId: number, dto: UserEditDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;

    return user;
  }

  async deleteUserById(userId: number, userIdParam: number) {
    if (userId !== userIdParam) {
      throw new ForbiddenException('Access to resources denied');
    }
    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
