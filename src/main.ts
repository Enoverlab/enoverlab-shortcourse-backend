import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({transform : true, transformOptions: {
    enableImplicitConversion: true, // <- This line here
  },}))

  app.enableCors({origin : ['http://localhost:3000','http://localhost:3001','http://localhost:5173', 'https://enoverlab-shortcourse-fe.vercel.app', 'https://enoverlab-shortcourse-fe-git-development-enoverlabs-projects.vercel.app','https://www.enoverlab.com','enoverlab-web-git-enoverassess-enoverlabs-projects.vercel.app'], credentials : true})

  app.use(cookieParser(process.env.COOKIE_SECRET))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
