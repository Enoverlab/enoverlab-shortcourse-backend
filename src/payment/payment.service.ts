import { Injectable } from '@nestjs/common';
import { initializePaymentDto } from './payment.dtos';
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = process.env.PK_SK
axios.defaults.headers.post['Content-Type'] = 'application/json';

@Injectable()
export class PaymentService {
    async initializePayment(paymentDetails : initializePaymentDto, request){
        const data = {
            cus_id : request.user
        }
        const stringifiedData = JSON.stringify(data)
        const values = {
            ...paymentDetails,
            metadata : stringifiedData

        }
        console.log(values)
        return values
        // await axios.post('https://api.paystack.co/transaction/initialize')
    }
}
