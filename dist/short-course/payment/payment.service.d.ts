import { initializePaymentDto } from './payment.dtos';
import { Request } from 'express';
import { UserService } from 'src/short-course/user/user.service';
export declare class PaymentService {
    private userService;
    constructor(userService: UserService);
    initializePayment(paymentDetails: initializePaymentDto, request: any): Promise<any>;
    paymentWebhook(request: Request): Promise<void>;
}
