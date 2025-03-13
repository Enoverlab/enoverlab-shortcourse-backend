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
exports.RatingSchema = exports.ModuleSchema = exports.CourseSchema = exports.Rating = exports.Module = exports.Course = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/user.schema");
let Course = class Course {
};
exports.Course = Course;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Course.prototype, "courseImg", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Course.prototype, "instructorName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Array)
], Course.prototype, "learningPoints", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], Course.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['basic', 'advanced', 'intermediate'], default: 'basic' }),
    __metadata("design:type", String)
], Course.prototype, "courseLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Module' }] }),
    __metadata("design:type", Array)
], Course.prototype, "modules", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Module' }] }),
    __metadata("design:type", Array)
], Course.prototype, "ratings", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "averageRating", void 0);
exports.Course = Course = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Course);
let Module = class Module {
};
exports.Module = Module;
__decorate([
    (0, mongoose_1.Prop)({ require: true, type: String }),
    __metadata("design:type", String)
], Module.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Module.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Module.prototype, "lessonVideo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Course' }),
    __metadata("design:type", Course)
], Module.prototype, "courseId", void 0);
exports.Module = Module = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Module);
let Rating = class Rating {
};
exports.Rating = Rating;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Rating.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Course' }),
    __metadata("design:type", Course)
], Rating.prototype, "courseId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 1, max: 5 }),
    __metadata("design:type", Number)
], Rating.prototype, "ratingValue", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Rating.prototype, "review", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Object)
], Rating.prototype, "ratedAt", void 0);
exports.Rating = Rating = __decorate([
    (0, mongoose_1.Schema)()
], Rating);
exports.CourseSchema = mongoose_1.SchemaFactory.createForClass(Course);
exports.CourseSchema.index({ title: 'text' });
exports.ModuleSchema = mongoose_1.SchemaFactory.createForClass(Module);
exports.RatingSchema = mongoose_1.SchemaFactory.createForClass(Rating);
//# sourceMappingURL=courses.schema.js.map