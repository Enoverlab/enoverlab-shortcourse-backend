import { WebAssessmentService } from './web-assessment.service';
import { userDto } from './dto/web-assessment.dto';
export declare class WebAssessmentController {
    private assessmentService;
    constructor(assessmentService: WebAssessmentService);
    createUser(userDto: userDto): Promise<import("./web-assessment.schema").UserAssessment>;
    getAssessment(userId: string): Promise<import("./web-assessment.schema").assessmentQuestion>;
    submitAssessment(data: object, userId: string): Promise<string>;
    getAssessmentResult(userId: string): Promise<import("./web-assessment.schema").AssessmentSubmission>;
}
