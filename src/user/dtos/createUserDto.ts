import { IsEmail, IsNotEmpty, IsString, IsOptional } from "class-validator";

export class createUserDto {

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional() 
    role: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional() 
    confirmedEmail: boolean;
}
