import mongoose, { Model } from 'mongoose';
import { User, UserPaidCourse } from 'src/short-course/user/user.schema';
import { createUserDto } from './dtos/createUserDto';
import { createUserPaidCourseDto } from './dtos/createUserPaidCourseDto';
export declare class UserService {
    private userModel;
    private UserPaidCourseModel;
    constructor(userModel: Model<User>, UserPaidCourseModel: Model<UserPaidCourse>);
    createUser(createUserDto: createUserDto): Promise<mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createUserPaidCourse(createUserPaidCourseDto: createUserPaidCourseDto): Promise<void>;
    findUserByEmail(email: string): Promise<mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    findUserById(Id: string): Promise<mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    findUserByIdAndUpdate(Id: string, updateProp: Record<string, any>): Promise<mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    findOrCreateGoogleUser(googleUser: {
        googleId: string;
        email: string;
        name: string;
    }): Promise<User & {
        _id: mongoose.Types.ObjectId;
    }>;
}
