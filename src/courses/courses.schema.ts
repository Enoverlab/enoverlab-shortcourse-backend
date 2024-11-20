import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date } from "mongoose";
import { User } from "src/user/user.schema";

@Schema({timestamps : true})
export class Course {
    @Prop({required : true, type : String})
    title : string

    @Prop({required : true})
    description : string

    @Prop({required : true, type : Number})
    price : number

    @Prop({type : [{ type : mongoose.Schema.Types.ObjectId, ref : 'Module'}]})
    modules : Module[]

    @Prop({type : [{ type : mongoose.Schema.Types.ObjectId, ref : 'Module'}]})
    ratings : Rating[]

    @Prop({type : Number, default : 0 })
    averageRating : number
}

@Schema({timestamps : true})
export class Module {
    @Prop({require : true, type : String})
    title : string

    @Prop({required : true, type : String})
    content : string

    @Prop({required : true, type : [{type : String}]})
    lessonVideos : string[]
}

@Schema()
export class Rating {
    @Prop({required : true, type : mongoose.Schema.Types.ObjectId})
    userId : User

    @Prop({required : true, type : mongoose.Schema.Types.ObjectId})
    courseId : Course

    @Prop({required : true, type : Number, min : 1, max : 5})
    ratingValue : number

    @Prop({type : String})
    review : string

    @Prop({type : Date, default : Date.now})
    ratedAt : Date
}

export const CourseSchema = SchemaFactory.createForClass(Course)

export const ModuleSchema = SchemaFactory.createForClass(Module)

export const RatingSchema = SchemaFactory.createForClass(Rating)