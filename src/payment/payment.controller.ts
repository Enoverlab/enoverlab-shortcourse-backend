import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { requestObj } from 'src/declarations';

@Controller('payment')
export class PaymentController {
    constructor(private paymentService : PaymentService){}

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Post()
    initializePayment(@Req() request:requestObj){
        console.log(request.user)
    }
}
