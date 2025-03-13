import { PaymentService } from './payment.service';
import { requestObj } from 'src/declarations';
import { initializePaymentDto } from './payment.dtos';
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    initializePayment(paymentInfo: initializePaymentDto, request: requestObj): Promise<any>;
    paymentWebhook(request: requestObj): Promise<void>;
}
