import { Body, Controller, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { signupDto } from './dto/signupDto';
import { AuthService } from './auth.service';
import { loginDto } from './dto/loginDto';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor (private authservice : AuthService){}
    @Post('signup')
    @UsePipes(new ValidationPipe({transform : true}))
    createUser(@Body() userData:signupDto){
        return this.authservice.signUp(userData)
    }


    @Post('login')
    loginUser(@Body() userData: loginDto, @Res({passthrough: true}) response:Response){
        return this.authservice.signIn(userData, response)
    }
    

    @UseGuards(AuthGuard)
    @Post('loginnn')
    usery(){
        console.log('object')
    }
}
