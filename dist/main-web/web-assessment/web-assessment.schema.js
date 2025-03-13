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
exports.AssessmentSubmissionSchema = exports.UserAssessmentSchema = exports.assessmentQuestionSchema = exports.assessmentQuestion = exports.QuestionSchema = exports.Question = exports.AssessmentSubmission = exports.UserAssessment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserAssessment = class UserAssessment {
};
exports.UserAssessment = UserAssessment;
__decorate([
    (0, mongoose_1.Prop)({ unique: true, required: true }),
    __metadata("design:type", String)
], UserAssessment.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UserAssessment.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UserAssessment.prototype, "phone_number", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'AssessmentSubmission' }),
    __metadata("design:type", Array)
], UserAssessment.prototype, "AssessmentSubmissions", void 0);
exports.UserAssessment = UserAssessment = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], UserAssessment);
let AssessmentSubmission = class AssessmentSubmission {
};
exports.AssessmentSubmission = AssessmentSubmission;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'UserAssessment', required: true }),
    __metadata("design:type", UserAssessment)
], AssessmentSubmission.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, required: true }),
    __metadata("design:type", Array)
], AssessmentSubmission.prototype, "answers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, required: true }),
    __metadata("design:type", Array)
], AssessmentSubmission.prototype, "score", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AssessmentSubmission.prototype, "feedback", void 0);
exports.AssessmentSubmission = AssessmentSubmission = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], AssessmentSubmission);
let Question = class Question extends mongoose_2.Document {
};
exports.Question = Question;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Question.prototype, "question", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    __metadata("design:type", Array)
], Question.prototype, "options", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Question.prototype, "multipleAnswers", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                if (!Array.isArray(this.options) || this.options.length === 0)
                    return false;
                if (!this.multipleAnswers && value.length > 1) {
                    throw new Error('Too many correct answers than necessary');
                }
                return Array.isArray(value) && value.every(answer => this.options.includes(answer));
            },
            message: 'Invalid correctAnswer. It must be included in options',
        },
    }),
    __metadata("design:type", Array)
], Question.prototype, "correctAnswer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['User Research', 'MVP', 'User Experience', 'Market Value'], required: true }),
    __metadata("design:type", String)
], Question.prototype, "aspect", void 0);
exports.Question = Question = __decorate([
    (0, mongoose_1.Schema)()
], Question);
exports.QuestionSchema = mongoose_1.SchemaFactory.createForClass(Question);
let assessmentQuestion = class assessmentQuestion {
};
exports.assessmentQuestion = assessmentQuestion;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], assessmentQuestion.prototype, "assessmentName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.QuestionSchema], required: true }),
    __metadata("design:type", Array)
], assessmentQuestion.prototype, "questions", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], assessmentQuestion.prototype, "active", void 0);
exports.assessmentQuestion = assessmentQuestion = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], assessmentQuestion);
exports.assessmentQuestionSchema = mongoose_1.SchemaFactory.createForClass(assessmentQuestion);
exports.UserAssessmentSchema = mongoose_1.SchemaFactory.createForClass(UserAssessment);
exports.AssessmentSubmissionSchema = mongoose_1.SchemaFactory.createForClass(AssessmentSubmission);
//# sourceMappingURL=web-assessment.schema.js.map