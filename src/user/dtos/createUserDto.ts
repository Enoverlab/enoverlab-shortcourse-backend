import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class createUserDto {

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email : string

    @IsString()
    @IsNotEmpty()
    password : string
    
}