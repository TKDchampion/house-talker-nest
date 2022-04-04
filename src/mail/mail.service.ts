import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailInfo } from './interface';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: MailInfo, token: string) {
    const url = `https://house-talker.com/app/activate?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'House Talker 啟用信',
      template: 'confirmation',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
