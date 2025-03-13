import { AssessmentSubmission, UserAssessment, assessmentQuestion } from './web-assessment.schema';
import { Model } from 'mongoose';
import { userDto } from './dto/web-assessment.dto';
export declare class WebAssessmentService {
    private UserAssessmentModel;
    private AssessmentSubmissionModel;
    private assessmentQuestionModel;
    constructor(UserAssessmentModel: Model<UserAssessment>, AssessmentSubmissionModel: Model<AssessmentSubmission>, assessmentQuestionModel: Model<assessmentQuestion>);
    createNewUserAssessment(userDto: userDto): Promise<UserAssessment>;
    gradeUserAssessment(userId: any, userSubmission: any): Promise<string>;
    getAssessmentQuestions(userId: any): Promise<assessmentQuestion>;
    getAssessmentResult(userId: any): Promise<AssessmentSubmission>;
}
