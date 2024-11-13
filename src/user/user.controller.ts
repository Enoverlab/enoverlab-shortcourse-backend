import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dtos/createUserDto';

@Controller('user')
export class UserController {
    constructor (private userService:UserService){}
    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: createUserDto){
        return this.userService.createUser(createUserDto)
    }

}
