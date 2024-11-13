import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { signupDto } from './dto/signupDto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor( private userService: UserService){}

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
}
