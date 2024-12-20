import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { loginDto } from "./loginDto"

export class signupDto extends loginDto {

    @IsString()
    @IsNotEmpty()
    name : string

    @IsString()
    @IsNotEmpty()
    role: string;

    @IsString()
    @IsNotEmpty()
    confirmedEmail: boolean;
}