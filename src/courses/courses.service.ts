import { Injectable } from '@nestjs/common';
import { Course } from './courses.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createCourseDto } from './courses.dtos';

@Injectable()
export class CoursesService {
    constructor(@InjectModel(Course.name) private courseModel:Model<Course>){}

    async createCourse(courseDetails: createCourseDto){
        const newCourse = new this.courseModel(courseDetails)
        await newCourse.save()
        return newCourse
    }

}
