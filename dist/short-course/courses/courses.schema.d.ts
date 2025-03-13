import mongoose, { Date } from "mongoose";
import { User } from "src/short-course/user/user.schema";
export declare class Course {
    title: string;
    description: string;
    courseImg: string;
    instructorName: string;
    learningPoints: string[];
    price: number;
    courseLevel: string;
    modules: Module[];
    ratings: Rating[];
    averageRating: number;
}
export declare class Module {
    title: string;
    content: string;
    lessonVideo: string;
    courseId: Course;
}
export declare class Rating {
    userId: User;
    courseId: Course;
    ratingValue: number;
    review: string;
    ratedAt: Date;
}
export declare const CourseSchema: mongoose.Schema<Course, mongoose.Model<Course, any, any, any, mongoose.Document<unknown, any, Course> & Course & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Course, mongoose.Document<unknown, {}, mongoose.FlatRecord<Course>> & mongoose.FlatRecord<Course> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const ModuleSchema: mongoose.Schema<Module, mongoose.Model<Module, any, any, any, mongoose.Document<unknown, any, Module> & Module & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Module, mongoose.Document<unknown, {}, mongoose.FlatRecord<Module>> & mongoose.FlatRecord<Module> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const RatingSchema: mongoose.Schema<Rating, mongoose.Model<Rating, any, any, any, mongoose.Document<unknown, any, Rating> & Rating & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Rating, mongoose.Document<unknown, {}, mongoose.FlatRecord<Rating>> & mongoose.FlatRecord<Rating> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
