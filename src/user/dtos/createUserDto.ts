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
    @IsOptional() 
    role?: string;

    @IsString()
    @IsNotEmpty()
    confirmedEmail: boolean;

    @IsString()
    @IsOptional()
    userimg?: string;
}
