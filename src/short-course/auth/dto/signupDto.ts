import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { loginDto } from "./loginDto"

export class signupDto extends loginDto {

    @IsString()
    @IsNotEmpty()
    name : string

    @IsString()
    @IsOptional()
    role: string;

    @IsString()
    @IsOptional()
    confirmedEmail: boolean;
}