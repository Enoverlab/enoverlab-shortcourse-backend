import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema, Blog, BlogSchema } from './blog.schema';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: Blog.name, schema: BlogSchema },
        { name: Author.name, schema: AuthorSchema },
      ]),
    ],
    controllers: [BlogController],
    providers: [BlogService],
  })
export class BlogModule {}
