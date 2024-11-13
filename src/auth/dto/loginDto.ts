import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"


export class loginDto{

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @Transform(({value})=> value.trim())
    @Transform(({value})=> value.toLowerCase())
    email : string


    @IsString()
    @IsNotEmpty()
    password : string
        
}