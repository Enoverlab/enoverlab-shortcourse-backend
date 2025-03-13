"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const crypto = require("crypto");
const user_service_1 = require("../user/user.service");
const pk_key = process.env.NODE_ENV != 'development' ? process.env.PK_SK : process.env.PK_SKTEST;
axios_1.default.defaults.headers.common['Authorization'] = 'Bearer ' + pk_key;
axios_1.default.defaults.headers.post['Content-Type'] = 'application/json';
let PaymentService = class PaymentService {
    constructor(userService) {
        this.userService = userService;
    }
    async initializePayment(paymentDetails, request) {
        try {
            const data = {
                cus_id: request.user._id,
                course_id: paymentDetails.courseId
            };
            console.log(data);
            const stringifiedData = JSON.stringify(data);
            const values = {
                amount: paymentDetails.amount,
                callback_url: paymentDetails.callback_url,
                email: request.user.email,
                currency: 'NGN',
                metadata: stringifiedData
            };
            console.log(values);
            const response = await axios_1.default.post('https://api.paystack.co/transaction/initialize', values);
            console.log(response.data);
            return response.data.data;
        }
        catch (error) {
            console.log(error);
        }
    }
    async paymentWebhook(request) {
        try {
            const hash = crypto.createHmac('sha512', pk_key).update(JSON.stringify(request.body)).digest('hex');
            const signature = request.headers['x-paystack-signature'];
            if (hash === signature) {
                const { event, data } = request.body;
                console.log(event);
                if (event === "charge.success") {
                    const userId = data.metadata.cus_id;
                    const course_id = data.metadata.course_id;
                    await this.userService.createUserPaidCourse({ courseId: course_id, datePurchased: data.paid_at, userId, trx_ref: data.reference, amount_paid: data.amount, trx_status: data.status });
                    await this.userService.findUserByIdAndUpdate(userId, { $push: { paidCourses: course_id } });
                }
            }
            return;
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map