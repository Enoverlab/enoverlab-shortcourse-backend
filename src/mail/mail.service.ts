import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import path from 'path/posix';
import { User } from 'src/user/user.schema';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}
  
    async sendUserConfirmation(user: User, token: string) {
        const FeBaseUrl = process.env.NODE_ENV == 'development' ? 'http://localhost:5173' : 'https://enoverlab-shortcourse-fe.vercel.app'
      const url = FeBaseUrl + `/mail/confirm?token=${token}`;
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Welcome! Confirm your Email',
        template: 'verification',
        context : {name : user.name, url}

      });
    }
  }
