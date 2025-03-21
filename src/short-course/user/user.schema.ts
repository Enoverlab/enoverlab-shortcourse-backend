import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Course } from "src/short-course/courses/courses.schema";

@Schema({timestamps : true})
export class User {
    @Prop({ unique: true, required: true })
    email: string;
  
    @Prop({ required: true })
    name: string;
  
    @Prop()
    password?: string;
  
    @Prop({ required: true, enum: ['student', 'admin', 'instructor'], default: 'student' })
    role: string;
  
    @Prop({ default: false })
    confirmedEmail: boolean;
  
    @Prop({required : true, enum : ['local', 'googleAuth'], default : 'local'})
    authMethod: string;

    @Prop({required : false})
    userimg?: string;
  
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserPaidCourse' }] })
    paidCourses: UserPaidCourse[];
  }


@Schema({timestamps : true})
export class UserPaidCourse{
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
    courseId: Course

    @Prop({type: Date, default: Date.now })
    datePurchased: Date

    @Prop({type: String, required : true })
    userId: User

    @Prop({type : String, required : true})
    trx_ref : string

    @Prop({type : String, required : true})
    trx_status : string

    @Prop({type : String, required : true})
    amount_paid : string

    @Prop()
    progress: [
        {
        moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
        status: { type: String, enum: ['not started', 'in progress', 'completed'], default: 'not started' },
        completedAt: { type: Date },
        },
    ]
}

export const UserSchema = SchemaFactory.createForClass(User)

export const UserPaidCourseSchema = SchemaFactory.createForClass(UserPaidCourse)