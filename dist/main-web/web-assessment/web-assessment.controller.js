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
exports.WebAssessmentController = void 0;
const common_1 = require("@nestjs/common");
const web_assessment_service_1 = require("./web-assessment.service");
const web_assessment_dto_1 = require("./dto/web-assessment.dto");
let WebAssessmentController = class WebAssessmentController {
    constructor(assessmentService) {
        this.assessmentService = assessmentService;
    }
    createUser(userDto) {
        return this.assessmentService.createNewUserAssessment(userDto);
    }
    getAssessment(userId) {
        return this.assessmentService.getAssessmentQuestions(userId);
    }
    submitAssessment(data, userId) {
        return this.assessmentService.gradeUserAssessment(userId, data);
    }
    getAssessmentResult(userId) {
        return this.assessmentService.getAssessmentResult(userId);
    }
};
exports.WebAssessmentController = WebAssessmentController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('onboarding'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [web_assessment_dto_1.userDto]),
    __metadata("design:returntype", void 0)
], WebAssessmentController.prototype, "createUser", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('questions'),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebAssessmentController.prototype, "getAssessment", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('submit-assessment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WebAssessmentController.prototype, "submitAssessment", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('result'),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebAssessmentController.prototype, "getAssessmentResult", null);
exports.WebAssessmentController = WebAssessmentController = __decorate([
    (0, common_1.Controller)('web-assessment'),
    __metadata("design:paramtypes", [web_assessment_service_1.WebAssessmentService])
], WebAssessmentController);
//# sourceMappingURL=web-assessment.controller.js.map