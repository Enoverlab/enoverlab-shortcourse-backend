import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { createUserDto } from './dtos/createUserDto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel:Model<User>){}

    async createUser(createUserDto: createUserDto){
        try {
            console.log(createUserDto)
            const user = new this.userModel(createUserDto)
            await user.save()
            return user
        } catch (error) {
            console.log(error)
            throw new HttpException(error, 400)
        }
    }

    async findUserByEmail(email: string){
        const userInfo =  await this.userModel.findOne({email}).exec()
        return userInfo
    }

    async findUserById(Id: string){
        const match = mongoose.Types.ObjectId.isValid(Id)
        if(match){
            const userInfo =  await this.userModel.findOne({_id : Id}).select('-password').exec()
            return userInfo
        }else{
            throw new HttpException('Invalid user Id', 400)
        }
        
    }

}
