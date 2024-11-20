import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class initializePaymentDto{

    @IsEmail()
    @IsNumber()
    @IsNotEmpty()
    amount : number

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email : string

    @IsString()
    @IsNotEmpty()
    callback_url : string
}
