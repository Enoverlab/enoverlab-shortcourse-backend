import { ArgumentMetadata, ForbiddenException, HttpException, Inject, Injectable, PipeTransform } from '@nestjs/common';
import { Course } from './courses.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createCourseDto } from './courses.dtos';
import {v2 as Cloudinary, UploadApiResponse} from 'cloudinary'


@Injectable()
export class CoursesService {
    constructor(@InjectModel(Course.name) private courseModel:Model<Course>, @Inject('CLOUDINARY') private readonly cloudinary: typeof Cloudinary){}

    async createCourse(courseDetails: createCourseDto, request, file: Express.Multer.File){
        if(request.user.role !== 'admin')
            throw new ForbiddenException('Access Denied')
        let result : UploadApiResponse
        if(file){
            result = await this.cloudinary.uploader.upload(file.path, {folder : 'course_Images'})
        }
            
        try {
            const newCourse = new this.courseModel({...courseDetails, courseImg : result ? result.secure_url : courseDetails.courseImg})
            await newCourse.save()
            return newCourse
        } catch (error) {
            console.log(error)
            result && await this.cloudinary.uploader.destroy(result.public_id)
            throw new HttpException(error, 401)
        }
    }

    async createModule(){
        
    }

}

export class FileSizeValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
      const tenMb = 10000000;
      if((value.size > tenMb)){
        throw new ForbiddenException('file size too large')
      }
      return value;
    }
  }
