"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const mail_service_1 = require("../mail/mail.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, mailService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async signUp(signupdetails, response) {
        try {
            const existingUser = await this.userService.findUserByEmail(signupdetails.email);
            if (existingUser)
                throw new common_1.HttpException('User already exists', 400);
            const hashedPassword = await bcrypt.hash(signupdetails.password, Number(process.env.SALT_ROUNDS));
            const transformedUserDetails = { ...signupdetails, password: hashedPassword };
            const userDetails = await this.userService.createUser(transformedUserDetails);
            response.clearCookie("auth_token", { path: '/', httpOnly: true, signed: true, sameSite: 'none', secure: true });
            const payload = { sub: userDetails._id };
            const token = await this.jwtService.signAsync(payload);
            await this.mailService.sendUserConfirmation(userDetails, token);
            return 'User successfully signed up';
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw new common_1.HttpException(error.message, 400);
            }
            throw new common_1.HttpException('An error Occurred, Contact Dev Team', 404);
        }
    }
    async signIn(signInDetails, response) {
        const { email, password } = signInDetails;
        const existingUser = await this.userService.findUserByEmail(email);
        if (!existingUser)
            throw new common_1.NotFoundException('User not found');
        const match = await bcrypt.compare(password, existingUser.password);
        if (!match)
            throw new common_1.UnauthorizedException('Incorrect Email or Password');
        response.clearCookie("auth_token", { path: '/', httpOnly: true, signed: true, sameSite: 'none', secure: true });
        const payload = { sub: existingUser._id };
        const token = await this.jwtService.signAsync(payload);
        if (!existingUser.confirmedEmail) {
            await this.mailService.sendUserConfirmation(existingUser, token);
            throw new common_1.UnauthorizedException('Kindly Check your email to validate your account');
        }
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        response.cookie("auth_token", token, { path: '/', expires, httpOnly: true, signed: true, sameSite: 'none', secure: true });
        const userDetails = existingUser.toObject();
        delete userDetails.password;
        return userDetails;
    }
    async googleSignIn(googleAuthDto, response) {
        try {
            const { name, email, confirmedEmail, userimg } = googleAuthDto;
            let user = await this.userService.findUserByEmail(email);
            if (!user) {
                user = await this.userService.createUser({
                    email,
                    name,
                    password: null,
                    confirmedEmail,
                    authMethod: 'googleAuth',
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
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Google authentication failed');
        }
    }
    async whoami(request) {
        return request.user;
    }
    async emailVerifyStatus(token, response) {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!token) {
            throw new common_1.UnauthorizedException('No token found');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: JWT_SECRET });
            if (payload) {
                const userDetails = await this.userService.findUserByIdAndUpdate(payload.sub, { confirmedEmail: true });
                response.clearCookie("auth_token", { path: '/', httpOnly: true, signed: true, sameSite: 'none', secure: true });
                const newtoken = await this.jwtService.signAsync({ sub: payload.sub });
                const expires = new Date();
                expires.setDate(expires.getDate() + 7);
                response.cookie("auth_token", newtoken, { path: '/', expires, httpOnly: true, signed: true, sameSite: 'none', secure: true });
                return userDetails;
            }
            else {
                throw new common_1.UnauthorizedException('Verification failed, Proceed to Login');
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException(error);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map