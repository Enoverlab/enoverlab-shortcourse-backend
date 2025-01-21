import { Injectable } from '@nestjs/common';
import { initializePaymentDto } from './payment.dtos';
import axios from 'axios';
import  { Request } from 'express';
import * as crypto from "crypto"
import { User, UserPaidCourse } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const pk_key = process.env.NODE_ENV != 'development' ? process.env.PK_SK : process.env.PK_SKTEST
axios.defaults.headers.common['Authorization'] = 'Bearer ' + pk_key
axios.defaults.headers.post['Content-Type'] = 'application/json';

@Injectable()
export class PaymentService {
    constructor(
        private userService: UserService,
    ) {
    }
    async initializePayment(paymentDetails : initializePaymentDto, request){
        try {
                const data = {
                    cus_id : request.user._id,
                    course_id : paymentDetails.courseId
                }
                console.log(data)
                const stringifiedData = JSON.stringify(data)
                const values = {
                    amount : paymentDetails.amount,
                    callback_url : paymentDetails.callback_url,
                    email : request.user.email,
                    currency : 'NGN',
                    metadata : stringifiedData
                }
                const response = await axios.post('https://api.paystack.co/transaction/initialize', values)
            console.log(response.data)
                return response.data.data
        } catch (error) {
            console.log(error)
        }
    }

    //   {
    //     event: 'charge.success',
    //     data: {
    //       id: 4596652024,
    //       domain: 'test',
    //       status: 'success',
    //       reference: 'rb1paycf81',       
    //       amount: 5000000,
    //       message: null,
    //       gateway_response: 'Successful',
    //       paid_at: '2025-01-18T10:16:50.000Z',
    //       created_at: '2025-01-18T10:16:38.000Z',
    //       channel: 'card',
    //       currency: 'NGN',
    //       ip_address: '105.112.198.13',  
    //       metadata: {
    //         cus_id: '67459fc717d15aed5ae6ac62',
    //         course_id: '674047d07c3d138cddd76c1b'
    //       },
    //       fees_breakdown: null,
    //       log: null,
    //       fees: 85000,
    //       fees_split: null,
    //       authorization: {
    //         authorization_code: 'AUTH_ziqf01dfo0',
    //         bin: '408408',
    //         last4: '4081',
    //         exp_month: '12',
    //         exp_year: '2030',
    //         channel: 'card',
    //         card_type: 'visa ',
    //         bank: 'TEST BANK',
    //         country_code: 'NG',
    //         brand: 'visa',
    //         reusable: true,
    //         signature: 'SIG_3YZPmmUtnSHYgkZcxW4C',
    //         account_name: null,
    //         receiver_bank_account_number:
    //    null,
    //         receiver_bank: null
    //       },
    //       customer: {
    //         id: 229434795,
    //         first_name: null,
    //         last_name: null,
    //         email: 'deemajor230600@gmail.com',
    //         customer_code: 'CUS_vjo7yuuahs3jxzg',
    //         phone: null,
    //         metadata: null,
    //         risk_action: 'default',      
    //         international_format_phone: null
    //       },
    //       plan: {},
    //       subaccount: {},
    //       paidAt: '2025-01-18T10:16:50.000Z',       
    //       requested_amount: 5000000,
    //       pos_transaction_data: null,
    //       source: {
    //         type: 'api',
    //         source: 'merchant_api',
    //         entry_point: 'transaction_initialize',  
    //         identifier: null
    //       }
    //     }
    //   }

    async paymentWebhook(request : Request){
        try {
            const hash = crypto.createHmac('sha512', pk_key).update(JSON.stringify(request.body)).digest('hex')
            const signature = request.headers['x-paystack-signature']
            if (hash === signature) {
            // Retrieve the request's body
                const {event, data} = request.body;
                console.log(event)
                if(event === "charge.success"){
                    const userId = data.metadata.cus_id
                    const course_id = data.metadata.course_id
                    await this.userService.createUserPaidCourse({courseId : course_id, datePurchased : data.paid_at, userId, trx_ref : data.reference, amount_paid : data.amount, trx_status : data.status}) 
                    await this.userService.findUserByIdAndUpdate(userId, {$push : {paidCourses : course_id}})
                }
            }
            return
        } catch (error) {
            console.log(error)
        }
    }
}

