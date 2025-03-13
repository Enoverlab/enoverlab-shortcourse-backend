import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { UserModule } from 'src/short-course/user/user.module';

@Module({
  imports : [UserModule],
  providers: [PaymentService, ],
  controllers: [PaymentController]
})
export class PaymentModule {}
