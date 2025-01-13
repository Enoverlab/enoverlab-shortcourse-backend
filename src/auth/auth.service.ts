import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { signupDto } from './dto/signupDto';
import { GoogleAuthDto } from './dto/google-auth.dto';
import * as bcrypt from 'bcryptjs';
import { loginDto } from './dto/loginDto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { Response } from 'express';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private mailService: MailService,
    ) {
    }

    async signUp(signupdetails: signupDto, response: Response) {
        try {
            const existingUser = await this.userService.findUserByEmail(signupdetails.email);
            if (existingUser) throw new HttpException('User already exists', 400);

            const hashedPassword = await bcrypt.hash(signupdetails.password, Number(process.env.SALT_ROUNDS));
            const transformedUserDetails = { ...signupdetails, password: hashedPassword };
            const userDetails = await this.userService.createUser(transformedUserDetails);

            response.clearCookie("auth_token", { path: '/', httpOnly: true, signed: true, sameSite: 'none', secure: true });

            const payload = { sub: userDetails._id };
            const token = await this.jwtService.signAsync(payload);
            await this.mailService.sendUserConfirmation(userDetails, token);
            return 'User successfully signed up';
        } catch (error) {
            if (error instanceof HttpException) {
                throw new HttpException(error.message, 400);
            }
            throw new HttpException('An error Occurred, Contact Dev Team', 404);
        }
    }

    async signIn(signInDetails: loginDto, response: Response) {
        const { email, password } = signInDetails;
        const existingUser = await this.userService.findUserByEmail(email);
        if (!existingUser) throw new NotFoundException('User not found');

        const match = await bcrypt.compare(password, existingUser.password);
        if (!match) throw new UnauthorizedException('Incorrect Email or Password');

        response.clearCookie("auth_token", { path: '/', httpOnly: true, signed: true, sameSite: 'none', secure: true });

        const payload = { sub: existingUser._id };
        const token = await this.jwtService.signAsync(payload);

        if (!existingUser.confirmedEmail) {
            await this.mailService.sendUserConfirmation(existingUser, token);
            throw new UnauthorizedException('Kindly Check your email to validate your account');
        }

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        response.cookie("auth_token", token, { path: '/', expires, httpOnly: true, signed: true, sameSite: 'none', secure: true });

        const userDetails = existingUser.toObject();
        delete userDetails.password;
        return userDetails;
    }

    async googleSignIn(googleAuthDto: GoogleAuthDto, response: Response) {
        try {
            const {name,email,confirmedEmail,userimg} = googleAuthDto

            let user = await this.userService.findUserByEmail(email);
            if (!user){
                user = await this.userService.createUser({
                    email,
                    name,
                    password: null,
                    confirmedEmail,
                    authMethod : 'googleAuth',
                    userimg
                });

            }

            response.clearCookie("auth_token", { path: '/', httpOnly: true, signed: true, sameSite: 'none', secure: true });
    
            const payload = { sub: user._id };

            const token = await this.jwtService.signAsync(payload);

            const expires = new Date();
            expires.setDate(expires.getDate() + 7);

            response.cookie("auth_token", token, { path: '/', expires, httpOnly: true, signed: true, sameSite: 'none', secure: true });
    
            const userDetails = user.toObject();
            delete userDetails.password;
    
            return userDetails;
        } catch (error) {
            throw new UnauthorizedException('Google authentication failed');
        }
    }
    
    async whoami(request) {
        return request.user;
    }

    async emailVerifyStatus(token, response) {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!token) {
            throw new UnauthorizedException('No token found');
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                { secret: JWT_SECRET }
            );

            if (payload) {
                const userDetails = await this.userService.findUserByIdAndUpdate(payload.sub, { confirmedEmail: true });
                response.clearCookie("auth_token", { path: '/', httpOnly: true, signed: true, sameSite: 'none', secure: true });

                const newtoken = await this.jwtService.signAsync({ sub: payload.sub });
                const expires = new Date();
                expires.setDate(expires.getDate() + 7);
                response.cookie("auth_token", newtoken, { path: '/', expires, httpOnly: true, signed: true, sameSite: 'none', secure: true });

                return userDetails;
            } else {
                throw new UnauthorizedException('Verification failed, Proceed to Login');
            }
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException(error);
        }
    }
}
