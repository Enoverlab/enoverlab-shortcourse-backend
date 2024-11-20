import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { request } from "express"

export class createUserDto {

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email : string

    @IsString()
    @IsNotEmpty()
    password : string
    
}