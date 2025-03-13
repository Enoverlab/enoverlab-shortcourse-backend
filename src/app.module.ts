import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './short-course/user/user.module';
import { AuthModule } from './short-course/auth/auth.module';
import { CoursesModule } from './short-course/courses/courses.module';
import { PaymentModule } from './short-course/payment/payment.module';
import { MailModule } from './short-course/mail/mail.module';
import { WebAssessmentModule } from './main-web/web-assessment/web-assessment.module';
import { BlogModule } from './main-web/blog/blog.module';

const testMongoString = process.env.MongoStringTest

const productionMongoString = process.env.MongoStringProd

const preferredDb = process.env.NODE_ENV == 'development' ? testMongoString :  productionMongoString

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal : true
  }), MongooseModule.forRoot(preferredDb), UserModule, AuthModule, CoursesModule, PaymentModule, MailModule, WebAssessmentModule, BlogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
