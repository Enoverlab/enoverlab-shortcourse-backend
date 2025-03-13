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
exports.WebAssessmentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const web_assessment_schema_1 = require("./web-assessment.schema");
const mongoose_2 = require("mongoose");
let WebAssessmentService = class WebAssessmentService {
    constructor(UserAssessmentModel, AssessmentSubmissionModel, assessmentQuestionModel) {
        this.UserAssessmentModel = UserAssessmentModel;
        this.AssessmentSubmissionModel = AssessmentSubmissionModel;
        this.assessmentQuestionModel = assessmentQuestionModel;
    }
    async createNewUserAssessment(userDto) {
        let userInfo;
        const { email } = userDto;
        userInfo = await this.UserAssessmentModel.findOne({ email });
        if (!userInfo) {
            userInfo = new this.UserAssessmentModel(userDto);
            userInfo.save();
        }
        return userInfo._id;
    }
    async gradeUserAssessment(userId, userSubmission) {
        try {
            const isValidId = mongoose_2.Types.ObjectId.isValid(userId);
            if (!isValidId) {
                throw new common_1.HttpException('Bad Request', 404);
            }
            const userInfo = await this.UserAssessmentModel.findById(userId);
            if (!userInfo) {
                throw new common_1.HttpException('Bad Request', 404);
            }
            const { dataId, userData } = userSubmission;
            const assessment = await this.assessmentQuestionModel.findById(dataId).lean();
            if (!assessment)
                throw new common_1.NotFoundException('Assessment not found');
            const aspectScores = {};
            const resultChoices = {};
            for (const question of assessment.questions) {
                const questionId = question._id.toString();
                const userAnswer = userData[questionId];
                const correctAnswers = question.correctAnswer.map(String);
                if (!aspectScores[question.aspect]) {
                    aspectScores[question.aspect] = { total: 0, correct: 0 };
                }
                aspectScores[question.aspect].total += 1;
                resultChoices[questionId] = {
                    question: question.question,
                    options: question.options,
                    selectedOption: userAnswer,
                    multipleAnswers: question.multipleAnswers,
                    correctAnswer: question.multipleAnswers ? correctAnswers : correctAnswers[0],
                };
                const isCorrect = question.multipleAnswers
                    ? Array.isArray(userAnswer) && userAnswer.every(ans => correctAnswers.includes(ans)) && userAnswer.length === correctAnswers.length
                    : correctAnswers.includes(userAnswer);
                if (isCorrect) {
                    aspectScores[question.aspect].correct += 1;
                }
            }
            const categorizedResults = Object.entries(aspectScores).map(([aspect, { total, correct }]) => ({
                aspect,
                percentageScore: ((correct / total) * 100).toFixed(0),
            }));
            const results = Object.entries(resultChoices).map(([questionId, { selectedOption, correctAnswer, question, options, multipleAnswers }]) => ({
                questionId, selectedOption, correctAnswer, question, options, multipleAnswers
            }));
            const totalCorrect = Object.values(aspectScores).reduce((sum, { correct }) => sum + correct, 0);
            const totalQuestions = Object.values(aspectScores).reduce((sum, { total }) => sum + total, 0);
            const totalPercentage = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(0) : '0';
            const feedback = `Your Total score for the Product Management Assessment is ${totalPercentage}%.`;
            const submission = new this.AssessmentSubmissionModel({
                userId,
                answers: results,
                score: [...categorizedResults, { aspect: 'total', percentageScore: totalPercentage }],
                feedback
            });
            await submission.save();
            await this.UserAssessmentModel.findByIdAndUpdate(userId, { $push: submission._id });
            return 'Submission Successful';
        }
        catch (error) {
            throw new common_1.HttpException(error.message, 400);
        }
    }
    async getAssessmentQuestions(userId) {
        try {
            const isValidId = mongoose_2.Types.ObjectId.isValid(userId);
            if (!isValidId) {
                throw new common_1.HttpException('Bad Request', 404);
            }
            const userInfo = await this.UserAssessmentModel.findById(userId);
            if (!userInfo) {
                throw new common_1.HttpException('Bad Request', 404);
            }
            const assessmentQuestion = this.assessmentQuestionModel.findOne({ active: true }).sort({ createdAt: -1 });
            return assessmentQuestion;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('User not found', 404);
        }
    }
    async getAssessmentResult(userId) {
        try {
            const isValidId = mongoose_2.Types.ObjectId.isValid(userId);
            if (!isValidId) {
                throw new common_1.HttpException('User not found', 404);
            }
            const userInfo = await this.UserAssessmentModel.findById(userId);
            if (!userInfo) {
                throw new common_1.HttpException('User not found', 404);
            }
            const assessment = await this.AssessmentSubmissionModel.findOne({ userId }).sort({ createdAt: -1 }).populate('userId');
            if (!assessment) {
                throw new common_1.NotFoundException('Assessment not found');
            }
            return assessment;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, 400);
        }
    }
};
exports.WebAssessmentService = WebAssessmentService;
exports.WebAssessmentService = WebAssessmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(web_assessment_schema_1.UserAssessment.name)),
    __param(1, (0, mongoose_1.InjectModel)(web_assessment_schema_1.AssessmentSubmission.name)),
    __param(2, (0, mongoose_1.InjectModel)(web_assessment_schema_1.assessmentQuestion.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.Model, mongoose_2.Model])
], WebAssessmentService);
//# sourceMappingURL=web-assessment.service.js.map