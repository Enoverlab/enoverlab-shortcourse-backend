import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserPaidCourse, UserPaidCourseSchema, UserSchema } from 'src/short-course/user/user.schema';
import { UserService } from './user.service';

@Module({
    imports : [
        MongooseModule.forFeature([{
            name : User.name,
            schema : UserSchema
        }, {
            name : UserPaidCourse.name,
            schema : UserPaidCourseSchema
        }])
    ],
    providers: [UserService],
    controllers: [],
    exports : [UserService]
})
export class UserModule {}
