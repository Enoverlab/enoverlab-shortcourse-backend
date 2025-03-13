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
exports.FileSizeValidationPipe = exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const courses_schema_1 = require("./courses.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const fs = require("fs");
let CoursesService = class CoursesService {
    constructor(courseModel, cloudinary) {
        this.courseModel = courseModel;
        this.cloudinary = cloudinary;
    }
    async createCourse(courseDetails, request, file) {
        if (request.user.role !== 'admin')
            throw new common_1.ForbiddenException('Access Denied');
        let result;
        if (file) {
            result = await this.cloudinary.uploader.upload(file.path, { folder: 'course_Images' });
            fs.unlinkSync(file.path);
        }
        try {
            const newCourse = new this.courseModel({ ...courseDetails, courseImg: result ? result.secure_url : courseDetails.courseImg });
            await newCourse.save();
            return newCourse;
        }
        catch (error) {
            console.log(error);
            if (result) {
                await this.cloudinary.uploader.destroy(result.public_id);
            }
            if (file) {
                fs.unlinkSync(file.path);
            }
            throw new common_1.HttpException(error, 401);
        }
    }
    async getAllCourses(courseLevel, courseName) {
        try {
            if (courseName) {
                const reg = new RegExp(courseName, 'i');
                const courses = await this.courseModel.find({ courseLevel }).where('title').regex(reg).exec();
                return courses;
            }
            const courses = await this.courseModel.find({ courseLevel }).exec();
            return courses;
        }
        catch (error) {
            throw new common_1.HttpException('An error Occured, contact Dev team', 400);
        }
    }
    async getCoursebyId(courseId) {
        try {
            if (!mongoose_2.default.Types.ObjectId.isValid(courseId)) {
                throw new common_1.ForbiddenException('Course not found');
            }
            const course = await this.courseModel.findById(courseId).exec();
            return course;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('An Error Occurred, contact Dev Team', 402);
        }
    }
    async createModule() {
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(courses_schema_1.Course.name)),
    __param(1, (0, common_1.Inject)('CLOUDINARY')),
    __metadata("design:paramtypes", [mongoose_2.Model, Object])
], CoursesService);
class FileSizeValidationPipe {
    transform(value, metadata) {
        const tenMb = 10000000;
        if (!value) {
            return;
        }
        if ((value.size > tenMb)) {
            throw new common_1.ForbiddenException('file size too large');
        }
        return value;
    }
}
exports.FileSizeValidationPipe = FileSizeValidationPipe;
//# sourceMappingURL=courses.service.js.map