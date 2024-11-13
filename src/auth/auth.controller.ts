import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { signupDto } from './dto/signupDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (private authservice : AuthService){}
    @Post('login')
    @UsePipes(new ValidationPipe({transform : true}))
    createUser(@Body() userData:signupDto){
        return this.authservice.signUp(userData)
    }
}
