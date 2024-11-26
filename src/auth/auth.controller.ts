import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { signupDto } from './dto/signupDto';
import { AuthService } from './auth.service';
import { loginDto } from './dto/loginDto';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor (private authservice : AuthService){}
    @Post('signup')
    @UsePipes(new ValidationPipe({transform : true}))
    createUser(@Body() userData:signupDto, @Res({passthrough: true}) response:Response){
        return this.authservice.signUp(userData, response)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    loginUser(@Body() userData: loginDto, @Res({passthrough: true}) response:Response){
        return this.authservice.signIn(userData, response)
    }
    
    
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get('whoami')
    whoami(@Req() request:Request){
        return this.authservice.whoami(request)
    }


    @HttpCode(HttpStatus.OK)
    @Get('verifyStatus')
    emailVerifyStatus(@Query('token') token : string, @Res({passthrough: true}) response:Response){
        return this.authservice.emailVerifyStatus(token, response)
    }
}
