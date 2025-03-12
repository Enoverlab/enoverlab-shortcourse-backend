import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';


@Module({
  imports : [MailerModule.forRootAsync({
    useFactory : async (config : ConfigService)=>({
      transport :{
        host : 'smtp.gmail.com',
        service : 'gmail',
        secure : false,
        auth : {
          user : config.get('GMAIL_USER'),
          pass : config.get('GMAIL_AUTH')
        }
      },
      defaults : {
        from : '"No Reply" <programs@enoverlab.com>'
      },
      template : {
        dir : join(__dirname, 'templates'),
        adapter : new EjsAdapter(),
        options : {
          strict : true
        }
      }
    }),
    inject: [ConfigService],

  })],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
