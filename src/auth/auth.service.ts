import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { signupDto } from './dto/signupDto';
import * as bcrypt from 'bcrypt'
import { loginDto } from './dto/loginDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor( private userService: UserService, private jwtService : JwtService){}

    async signUp(signupdetails : signupDto){
        try {
            const existingUser = await this.userService.findUserByEmail(signupdetails.email)
        if(existingUser) throw new HttpException('User already exists', 400)
        const hashedPassword = await bcrypt.hash(signupdetails.password, Number(process.env.SALT_ROUNDS))
        
        const transformedUserDetails = {...signupdetails, password : hashedPassword}
        this.userService.createUser(transformedUserDetails)
        return 'User Created Successfully'
        } catch (error) {
            console.log(error)
            throw new HttpException('An error Occured, Contact Dev Team', 404)
        }


    }

    async signIn(signInDetails: loginDto, response ){
        try {
            const {email, password} = signInDetails
            const existingUser = await this.userService.findUserByEmail(email)
            console.log(existingUser)
            if(!existingUser) throw new NotFoundException('User not found')
            
            const match = await bcrypt.compare(password, existingUser.password)

            if(!match)
                throw  new UnauthorizedException('Incorrect Email or Password')

            response.clearCookie("auth_token",{path : '/', domain : 'localhost', httpOnly : true, signed : true})
            const payload = { sub: existingUser._id};
            const token = await this.jwtService.signAsync(payload)

            const expires = new Date()
            expires.setDate(expires.getDate() + 7)

            response.cookie("auth_token", token, {path : '/', domain : 'localhost', expires, httpOnly : true, signed : true})

        } catch (error) {
            console.log(error)
            throw new HttpException(`An error occured, contact dev team. Error log: ${new Date().getDate()}, ${new Date().getTime()}`, 400)
        }
    }






    
}
