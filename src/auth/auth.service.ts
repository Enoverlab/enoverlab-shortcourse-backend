import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { signupDto } from './dto/signupDto';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dto/loginDto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { OAuth2Client } from 'google-auth-library';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { User } from '../user/user.schema';  // Ensure User is imported
import { Document } from 'mongoose';

@Injectable()
export class AuthService {
    private oauth2Client: OAuth2Client;

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private mailService: MailService,
    ) {
        this.oauth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }

    async signUp(signupdetails: signupDto, response) {
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

    async signIn(signInDetails: loginDto, response) {
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

    async googleSignUp(googleAuthDto: GoogleAuthDto, response) {
        const { token } = googleAuthDto;
    
        try {
            const ticket = await this.oauth2Client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
    
            const googleUser = ticket.getPayload();
            if (!googleUser) throw new UnauthorizedException('Google login failed');
    
            let existingUser = await this.userService.findUserByEmail(googleUser.email);
    
            if (!existingUser) {
                // Create the user if it doesn't exist
                existingUser = await this.userService.createUser({
                    email: googleUser.email,
                    name: googleUser.name,
                    password: null,
                    role: 'user',
                    confirmedEmail: true,
                });
            }
    
            // Cast the existingUser to the Mongoose Document type
            const existingUserDocument = existingUser as User & Document;
    
            const payload = { sub: existingUserDocument._id };
            const jwtToken = await this.jwtService.signAsync(payload);
    
            response.cookie("auth_token", jwtToken, {
                path: '/',
                httpOnly: true,
                signed: true,
                sameSite: 'none',
                secure: true,
            });
    
            const userDetails = existingUserDocument.toObject();
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
