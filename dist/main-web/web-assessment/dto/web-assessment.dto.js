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
exports.SubmitAssessmentDto = exports.userDto = void 0;
const class_validator_1 = require("class-validator");
class userDto {
}
exports.userDto = userDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], userDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], userDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], userDto.prototype, "phone_number", void 0);
class SubmitAssessmentDto {
}
exports.SubmitAssessmentDto = SubmitAssessmentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitAssessmentDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SubmitAssessmentDto.prototype, "answers", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SubmitAssessmentDto.prototype, "score", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitAssessmentDto.prototype, "feedback", void 0);
//# sourceMappingURL=web-assessment.dto.js.map