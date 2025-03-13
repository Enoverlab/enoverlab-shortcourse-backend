"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./short-course/user/user.module");
const auth_module_1 = require("./short-course/auth/auth.module");
const courses_module_1 = require("./short-course/courses/courses.module");
const payment_module_1 = require("./short-course/payment/payment.module");
const mail_module_1 = require("./short-course/mail/mail.module");
const web_assessment_module_1 = require("./main-web/web-assessment/web-assessment.module");
const blog_module_1 = require("./main-web/blog/blog.module");
const testMongoString = process.env.MongoStringTest;
const productionMongoString = process.env.MongoStringProd;
const preferredDb = process.env.NODE_ENV == 'development' ? testMongoString : productionMongoString;
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }), mongoose_1.MongooseModule.forRoot(preferredDb), user_module_1.UserModule, auth_module_1.AuthModule, courses_module_1.CoursesModule, payment_module_1.PaymentModule, mail_module_1.MailModule, web_assessment_module_1.WebAssessmentModule, blog_module_1.BlogModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map