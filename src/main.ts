import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform : true}))
  app.enableCors({origin : ['http://localhost:3000','http://localhost:5173', 'https://enoverlab-shortcourses-xfj9.vercel.app'], credentials : true})

  app.use(cookieParser(process.env.COOKIE_SECRET))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
