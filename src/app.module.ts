import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { PaymentModule } from './payment/payment.module';
import { MailModule } from './mail/mail.module';

const testMongoString = process.env.MongoStringTest

const productionMongoString = process.env.MongoStringProd



const preferredDb = process.env.NODE_ENV == 'development' ? testMongoString :  productionMongoString

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal : true
  }), MongooseModule.forRoot(preferredDb), UserModule, AuthModule, CoursesModule, PaymentModule, MailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
