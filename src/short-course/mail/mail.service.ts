import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/short-course/user/user.schema';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}
  
    async sendUserConfirmation(user: User, token: string) {
      const FeBaseUrl = process.env.NODE_ENV == 'development' ? process.env.FRONTEND_URL_DEV : 'https://enoverlab-shortcourse-fe.vercel.app'
      const url = FeBaseUrl + `/mail/confirm?token=${token}`;
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Welcome! Confirm your Email',
        template: 'verification',
        context : {name : user.name, url}

      });
    }
  }
