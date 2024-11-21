import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './courses.schema';

@Module({
  imports : [MongooseModule.forFeature([{
    name : Course.name,
    schema : CourseSchema
  }])],
  providers: [CoursesService]
})
export class CoursesModule {}
