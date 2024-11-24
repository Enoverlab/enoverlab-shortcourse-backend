import { Injectable } from '@nestjs/common';
import { initializePaymentDto } from './payment.dtos';
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = process.env.NODE_ENV != 'development' ? process.env.PK_SK : process.env.PK_SKTEST
axios.defaults.headers.post['Content-Type'] = 'application/json';

@Injectable()
export class PaymentService {
    async initializePayment(paymentDetails : initializePaymentDto, request){
        try {
            const data = {
                cus_id : request.user._id
            }
            const stringifiedData = JSON.stringify(data)
            const values = {
                ...paymentDetails,
                email : request.user.email,
                currency : 'NGN',
                metadata : stringifiedData
    
            }
            const response = await axios.post('https://api.paystack.co/transaction/initialize', values)
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }
}
