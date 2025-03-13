"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
let UserService = class UserService {
    constructor(userModel, UserPaidCourseModel) {
        this.userModel = userModel;
        this.UserPaidCourseModel = UserPaidCourseModel;
    }
    async createUser(createUserDto) {
        try {
            const user = new this.userModel(createUserDto);
            await user.save();
            const userData = await this.userModel.findById(user._id).select('-password').exec();
            return userData;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.message || 'Error creating user', 400);
        }
    }
    async createUserPaidCourse(createUserPaidCourseDto) {
        try {
            const paidCourse = new this.UserPaidCourseModel(createUserPaidCourseDto);
            await paidCourse.save();
            return;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.message || 'Error creating paid course', 400);
        }
    }
    async findUserByEmail(email) {
        try {
            const user = await this.userModel.findOne({ email }).exec();
            return user;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.message || 'Error finding user by email', 400);
        }
    }
    async findUserById(Id) {
        const isValidId = mongoose_2.default.Types.ObjectId.isValid(Id);
        if (isValidId) {
            try {
                const user = await this.userModel.findById(Id).select('-password').exec();
                return user;
            }
            catch (error) {
                console.log(error);
                throw new common_1.HttpException('User not found', 404);
            }
        }
        else {
            throw new common_1.HttpException('Invalid user ID', 400);
        }
    }
    async findUserByIdAndUpdate(Id, updateProp) {
        const isValidId = mongoose_2.default.Types.ObjectId.isValid(Id);
        if (isValidId) {
            try {
                const user = await this.userModel.findByIdAndUpdate(Id, updateProp, { new: true }).select('-password').exec();
                return user;
            }
            catch (error) {
                console.log(error);
                throw new common_1.HttpException('Error updating user', 400);
            }
        }
        else {
            throw new common_1.HttpException('Invalid user ID', 400);
        }
    }
    async findOrCreateGoogleUser(googleUser) {
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
        }
        catch (error) {
            console.error('Error handling Google user:', error);
            throw new common_1.HttpException('Error handling Google user', 500);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.UserPaidCourse.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map