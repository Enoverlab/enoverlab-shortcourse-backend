import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema, ModuleSchema } from './courses.schema';
import { CoursesController } from './courses.controller';
import { UserModule } from 'src/short-course/user/user.module';
import { CloudinaryConfig } from 'src/config/cloudinary.config';
import { UserPaidCourse, UserPaidCourseSchema } from '../user/user.schema';

@Module({
  imports : [MongooseModule.forFeature([{
    name : Course.name,
    schema : CourseSchema
  },{name : Module.name, schema : ModuleSchema},{name :UserPaidCourse.name, schema : UserPaidCourseSchema}]), UserModule],
  providers: [CoursesService, CloudinaryConfig],
  controllers: [CoursesController]
})
export class CoursesModule {}
