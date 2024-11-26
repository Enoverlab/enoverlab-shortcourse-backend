import { ArgumentMetadata, ForbiddenException, HttpException, Inject, Injectable, PipeTransform } from '@nestjs/common';
import { Course } from './courses.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { createCourseDto } from './courses.dtos';
import {v2 as Cloudinary, UploadApiResponse} from 'cloudinary'
import * as fs from 'fs'


@Injectable()
export class CoursesService {
    constructor(@InjectModel(Course.name) private courseModel:Model<Course>, @Inject('CLOUDINARY') private readonly cloudinary: typeof Cloudinary){}

    async createCourse(courseDetails: createCourseDto, request, file: Express.Multer.File){
        if(request.user.role !== 'admin')
            throw new ForbiddenException('Access Denied')
        let result : UploadApiResponse
        if(file){
            result = await this.cloudinary.uploader.upload(file.path, {folder : 'course_Images'})
            fs.unlinkSync(file.path)
        }
            
        try {
            const newCourse = new this.courseModel({...courseDetails, courseImg : result ? result.secure_url : courseDetails.courseImg})
            await newCourse.save()
            return newCourse
        } catch (error) {
            console.log(error)
            if (result){
                await this.cloudinary.uploader.destroy(result.public_id)
            }
            if(file){
                fs.unlinkSync(file.path)
            }
            throw new HttpException(error, 401)
        }
    }

    async getAllCourses(courseLevel : string, courseName : string){
        try {
            if(courseName){
                const reg = new RegExp(courseName, 'i')  
                const courses = await this.courseModel.find({courseLevel}).where('title').regex(reg).exec()
                return courses
            }
            const courses = await this.courseModel.find({courseLevel}).exec()
            return courses
            
        } catch (error) {
            throw new HttpException('An error Occured, contact Dev team', 400)
        }
    }

    async getCoursebyId(courseId : string){
        try {
            if(!mongoose.Types.ObjectId.isValid(courseId)){
                throw new ForbiddenException('Course not found')
            }
            const course = await this.courseModel.findById(courseId).exec()
            return course 
        } catch (error) {
            console.log(error)
            throw new HttpException('An Error Occurred, contact Dev Team', 402)
        }
    }

    async createModule(){
        
    }

}

export class FileSizeValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
      const tenMb = 10000000;
      if(!value){
        return
      }
      if((value.size > tenMb)){
        throw new ForbiddenException('file size too large')
      }
      return value;
    }
  }
