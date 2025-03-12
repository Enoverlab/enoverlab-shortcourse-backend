import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from 'src/short-course/mail/mail.module';



@Module({
  imports : [ConfigModule.forRoot({
    isGlobal : true
  }),UserModule, JwtModule.register({
    global : true,
    secret : process.env.JWT_SECRET,
    signOptions : {expiresIn : '7d'}
  }), MailModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
