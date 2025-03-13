import { UserService } from '../user/user.service';
import { signupDto } from './dto/signupDto';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { loginDto } from './dto/loginDto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/short-course/mail/mail.service';
import { Response } from 'express';
export declare class AuthService {
    private userService;
    private jwtService;
    private mailService;
    constructor(userService: UserService, jwtService: JwtService, mailService: MailService);
    signUp(signupdetails: signupDto, response: Response): Promise<string>;
    signIn(signInDetails: loginDto, response: Response): Promise<import("../user/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    googleSignIn(googleAuthDto: GoogleAuthDto, response: Response): Promise<import("../user/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    whoami(request: any): Promise<any>;
    emailVerifyStatus(token: any, response: any): Promise<import("mongoose").Document<unknown, {}, import("../user/user.schema").User> & import("../user/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
