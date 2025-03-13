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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPaidCourseSchema = exports.UserSchema = exports.UserPaidCourse = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const courses_schema_1 = require("../courses/courses.schema");
let User = class User {
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ unique: true, required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['student', 'admin', 'instructor'], default: 'student' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "confirmedEmail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['local', 'googleAuth'], default: 'local' }),
    __metadata("design:type", String)
], User.prototype, "authMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], User.prototype, "userimg", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'UserPaidCourse' }] }),
    __metadata("design:type", Array)
], User.prototype, "paidCourses", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
let UserPaidCourse = class UserPaidCourse {
};
exports.UserPaidCourse = UserPaidCourse;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Course' }),
    __metadata("design:type", courses_schema_1.Course)
], UserPaidCourse.prototype, "courseId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], UserPaidCourse.prototype, "datePurchased", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", User)
], UserPaidCourse.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], UserPaidCourse.prototype, "trx_ref", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], UserPaidCourse.prototype, "trx_status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], UserPaidCourse.prototype, "amount_paid", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], UserPaidCourse.prototype, "progress", void 0);
exports.UserPaidCourse = UserPaidCourse = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], UserPaidCourse);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserPaidCourseSchema = mongoose_1.SchemaFactory.createForClass(UserPaidCourse);
//# sourceMappingURL=user.schema.js.map