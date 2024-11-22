import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { signupDto } from './dto/signupDto';
import * as bcrypt from 'bcrypt'
import { loginDto } from './dto/loginDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor( private userService: UserService, private jwtService : JwtService){}

    async signUp(signupdetails : signupDto, response){
        try {
            const existingUser = await this.userService.findUserByEmail(signupdetails.email)
            if(existingUser) throw new HttpException('User already exists', 400)
            const hashedPassword = await bcrypt.hash(signupdetails.password, Number(process.env.SALT_ROUNDS))
            const transformedUserDetails = {...signupdetails, password : hashedPassword}
            const userDetails = await this.userService.createUser(transformedUserDetails)
            response.clearCookie("auth_token",{path : '/', httpOnly : true, signed : true, sameSite : 'none',secure : true, domain : process.env.DOMAIN || 'localhost'})
            const payload = {sub: userDetails._id};
            const token = await this.jwtService.signAsync(payload)

            const expires = new Date()
            expires.setDate(expires.getDate() + 7)

            response.cookie("auth_token", token, {path : '/', expires, httpOnly : true, signed : true,secure : true, sameSite : 'none', domain : process.env.DOMAIN || 'localhost'})

            return userDetails
        } catch (error) {
            if(error instanceof HttpException){
                throw new HttpException(error.message, 400)
            }
            throw new HttpException('An error Occured, Contact Dev Team', 404)
        }
    }

    async signIn(signInDetails: loginDto, response ){
        const {email, password} = signInDetails
        const existingUser = await this.userService.findUserByEmail(email)
        if(!existingUser) throw new NotFoundException('User not found')
        
        const match = await bcrypt.compare(password, existingUser.password)

        if(!match)
            throw  new UnauthorizedException('Incorrect Email or Password')

        response.clearCookie("auth_token",{path : '/', httpOnly : true, signed : true, sameSite : 'none', secure : true, domain : process.env.DOMAIN || 'localhost'})
        const payload = { sub: existingUser._id};
        const token = await this.jwtService.signAsync(payload)

        const expires = new Date()
        expires.setDate(expires.getDate() + 7)

        response.cookie("auth_token", token, {path : '/', expires, httpOnly : true, signed : true, sameSite : 'none', secure : true, domain : process.env.DOMAIN || 'localhost' })
        const userDetails = existingUser.toObject()
        delete userDetails.password
        return userDetails
    }

    async whoami(request){
        return request.user
    }






    
}
