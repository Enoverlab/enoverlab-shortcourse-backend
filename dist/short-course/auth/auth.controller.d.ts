import { signupDto } from './dto/signupDto';
import { AuthService } from './auth.service';
import { loginDto } from './dto/loginDto';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private authservice;
    constructor(authservice: AuthService);
    createUser(userData: signupDto, response: Response): Promise<string>;
    loginUser(userData: loginDto, response: Response): Promise<import("../user/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    whoami(request: Request): Promise<any>;
    emailVerifyStatus(token: string, response: Response): Promise<import("mongoose").Document<unknown, {}, import("../user/user.schema").User> & import("../user/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    googleSignUp(googleAuthDto: GoogleAuthDto, response: Response): Promise<import("../user/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
