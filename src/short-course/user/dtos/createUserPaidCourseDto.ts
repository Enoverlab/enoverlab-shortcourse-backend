import { IsNotEmpty, IsString } from "class-validator";

export class createUserPaidCourseDto {
    @IsString()
    @IsNotEmpty()
    courseId: string;

    @IsString()
    @IsNotEmpty()
    datePurchased: Date;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty() 
    trx_ref: string;

    @IsString()
    @IsNotEmpty() 
    trx_status: string;

    @IsString()
    @IsNotEmpty() 
    amount_paid: string;
}
