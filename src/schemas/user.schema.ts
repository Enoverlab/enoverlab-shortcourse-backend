import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps : true})
export class User{
    @Prop({unique : true, required : true})
    email : string

    @Prop({required : true})
    name : string

    @Prop({required : true})
    password : string

    @Prop({default : false})
    confirmedEmail : boolean
}

export const UserSchema = SchemaFactory.createForClass(User)