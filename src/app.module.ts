import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { PaymentModule } from './payment/payment.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal : true
  }), MongooseModule.forRoot(`${process.env.MongoString}`), UserModule, AuthModule, CoursesModule, PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
