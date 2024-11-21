import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class initializePaymentDto{
    @IsNumber()
    @IsNotEmpty()
    amount : number

    @IsString()
    @IsNotEmpty()
    callback_url : string
}
