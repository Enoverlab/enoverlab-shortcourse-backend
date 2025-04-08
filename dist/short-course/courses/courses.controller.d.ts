import { CoursesService } from './courses.service';
import { requestObj } from 'src/declarations';
import { createCourseDto, updateCourseTrack } from './courses.dtos';
export declare class CoursesController {
    private courseService;
    constructor(courseService: CoursesService);
    createCourse(courseDetails: createCourseDto, request: requestObj, file: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, import("./courses.schema").Course> & import("./courses.schema").Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getcourses(courseLevel: string, courseName: string): Promise<(import("mongoose").Document<unknown, {}, import("./courses.schema").Course> & import("./courses.schema").Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getcourseById(courseId: string): Promise<import("mongoose").Document<unknown, {}, import("./courses.schema").Course> & import("./courses.schema").Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateCourseTrack(trackDetails: updateCourseTrack, request: requestObj): Promise<void>;
}
