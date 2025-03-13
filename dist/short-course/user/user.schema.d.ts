import mongoose from "mongoose";
import { Course } from "src/short-course/courses/courses.schema";
export declare class User {
    email: string;
    name: string;
    password?: string;
    role: string;
    confirmedEmail: boolean;
    authMethod: string;
    userimg?: string;
    paidCourses: UserPaidCourse[];
}
export declare class UserPaidCourse {
    courseId: Course;
    datePurchased: Date;
    userId: User;
    trx_ref: string;
    trx_status: string;
    amount_paid: string;
    progress: [
        {
            moduleId: {
                type: mongoose.Schema.Types.ObjectId;
                ref: 'Module';
            };
            status: {
                type: String;
                enum: ['not started', 'in progress', 'completed'];
                default: 'not started';
            };
            completedAt: {
                type: Date;
            };
        }
    ];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & mongoose.FlatRecord<User> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const UserPaidCourseSchema: mongoose.Schema<UserPaidCourse, mongoose.Model<UserPaidCourse, any, any, any, mongoose.Document<unknown, any, UserPaidCourse> & UserPaidCourse & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserPaidCourse, mongoose.Document<unknown, {}, mongoose.FlatRecord<UserPaidCourse>> & mongoose.FlatRecord<UserPaidCourse> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
