import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { Course } from './courses.schema';
import mongoose, { Model } from 'mongoose';
import { createCourseDto, updateCourseTrack } from './courses.dtos';
import { v2 as Cloudinary } from 'cloudinary';
import { UserPaidCourse } from '../user/user.schema';
import { requestObj } from 'src/declarations';
export declare class CoursesService {
    private courseModel;
    private readonly cloudinary;
    private UserPaidCourseModel;
    constructor(courseModel: Model<Course>, cloudinary: typeof Cloudinary, UserPaidCourseModel: Model<UserPaidCourse>);
    createCourse(courseDetails: createCourseDto, request: any, file: Express.Multer.File): Promise<mongoose.Document<unknown, {}, Course> & Course & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllCourses(courseLevel: string, courseName: string): Promise<(mongoose.Document<unknown, {}, Course> & Course & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getCoursebyId(courseId: string): Promise<mongoose.Document<unknown, {}, Course> & Course & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateCourseTrack(details: updateCourseTrack, request: requestObj): Promise<void>;
}
export declare class FileSizeValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
