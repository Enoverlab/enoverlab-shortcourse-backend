import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { createUserDto } from './dtos/createUserDto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(createUserDto: createUserDto) {
        try {
            const user = new this.userModel(createUserDto);
            await user.save();
            const userData = await this.userModel.findById(user._id).select('-password').exec();
            return userData;
        } catch (error) {
            console.log(error);
            throw new HttpException(error.message || 'Error creating user', 400);
        }
    }

    async findUserByEmail(email: string) {
        try {
            const user = await this.userModel.findOne({ email }).exec();
            return user;
        } catch (error) {
            console.log(error);
            throw new HttpException(error.message || 'Error finding user by email', 400);
        }
    }

    async findUserById(Id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(Id);
        if (isValidId) {
            try {
                const user = await this.userModel.findById(Id).select('-password').exec();
                return user;
            } catch (error) {
                console.log(error);
                throw new HttpException('User not found', 404);
            }
        } else {
            throw new HttpException('Invalid user ID', 400);
        }
    }

    async findUserByIdAndUpdate(Id: string, updateProp: Record<string, any>) {
        const isValidId = mongoose.Types.ObjectId.isValid(Id);
        if (isValidId) {
            try {
                const user = await this.userModel.findByIdAndUpdate(Id, updateProp, { new: true }).select('-password').exec();
                return user;
            } catch (error) {
                console.log(error);
                throw new HttpException('Error updating user', 400);
            }
        } else {
            throw new HttpException('Invalid user ID', 400);
        }
    }

    async findOrCreateGoogleUser(googleUser: { googleId: string; email: string; name: string }) {
        try {
            let user = await this.userModel.findOne({ googleId: googleUser.googleId });
            if (!user) {
                user = await this.userModel.findOne({ email: googleUser.email });
            }

            if (!user) {
                user = new this.userModel({
                    googleId: googleUser.googleId,
                    email: googleUser.email,
                    name: googleUser.name,
                    password: null,
                });

                await user.save();
            }

            return user.toObject();
        } catch (error) {
            console.error('Error handling Google user:', error);
            throw new HttpException('Error handling Google user', 500);
        }
    }
}
