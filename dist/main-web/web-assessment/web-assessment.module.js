"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebAssessmentModule = void 0;
const common_1 = require("@nestjs/common");
const web_assessment_controller_1 = require("./web-assessment.controller");
const mongoose_1 = require("@nestjs/mongoose");
const web_assessment_schema_1 = require("./web-assessment.schema");
const web_assessment_service_1 = require("./web-assessment.service");
let WebAssessmentModule = class WebAssessmentModule {
};
exports.WebAssessmentModule = WebAssessmentModule;
exports.WebAssessmentModule = WebAssessmentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: web_assessment_schema_1.UserAssessment.name,
                    schema: web_assessment_schema_1.UserAssessmentSchema
                }, {
                    name: web_assessment_schema_1.AssessmentSubmission.name,
                    schema: web_assessment_schema_1.AssessmentSubmissionSchema
                },
                {
                    name: web_assessment_schema_1.assessmentQuestion.name,
                    schema: web_assessment_schema_1.assessmentQuestionSchema
                },
            ])
        ],
        controllers: [web_assessment_controller_1.WebAssessmentController],
        providers: [web_assessment_service_1.WebAssessmentService]
    })
], WebAssessmentModule);
//# sourceMappingURL=web-assessment.module.js.map