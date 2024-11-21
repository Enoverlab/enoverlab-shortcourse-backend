import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { requestObj } from 'src/declarations';
import { initializePaymentDto } from './payment.dtos';

@Controller('payment')
export class PaymentController {
    constructor(private paymentService : PaymentService){}

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Post('initialize')
    initializePayment(@Body() paymentInfo: initializePaymentDto, @Req() request:requestObj){
        return this.paymentService.initializePayment(paymentInfo, request)
    }
}
