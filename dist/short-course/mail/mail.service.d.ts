import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/short-course/user/user.schema';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendUserConfirmation(user: User, token: string): Promise<void>;
}
