import mongoose, { Document } from "mongoose";
export declare class UserAssessment {
    email: string;
    name: string;
    phone_number: string;
    AssessmentSubmissions?: AssessmentSubmission[];
}
export declare class AssessmentSubmission {
    userId: UserAssessment;
    answers: {
        questionId: string;
        selectedOption: string | string[];
        correctAnswer: string | string[];
        options: String[];
    }[];
    score: {
        aspect: string;
        percentageScore: string;
    }[];
    feedback?: string;
}
export declare class Question extends Document {
    question: string;
    options: string[];
    multipleAnswers: boolean;
    correctAnswer: string[];
    aspect: string;
}
export declare const QuestionSchema: mongoose.Schema<Question, mongoose.Model<Question, any, any, any, mongoose.Document<unknown, any, Question> & Question & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Question, mongoose.Document<unknown, {}, mongoose.FlatRecord<Question>> & mongoose.FlatRecord<Question> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare class assessmentQuestion {
    assessmentName: string;
    questions: Question[];
    active: boolean;
}
export declare const assessmentQuestionSchema: mongoose.Schema<assessmentQuestion, mongoose.Model<assessmentQuestion, any, any, any, mongoose.Document<unknown, any, assessmentQuestion> & assessmentQuestion & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, assessmentQuestion, mongoose.Document<unknown, {}, mongoose.FlatRecord<assessmentQuestion>> & mongoose.FlatRecord<assessmentQuestion> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const UserAssessmentSchema: mongoose.Schema<UserAssessment, mongoose.Model<UserAssessment, any, any, any, mongoose.Document<unknown, any, UserAssessment> & UserAssessment & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserAssessment, mongoose.Document<unknown, {}, mongoose.FlatRecord<UserAssessment>> & mongoose.FlatRecord<UserAssessment> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const AssessmentSubmissionSchema: mongoose.Schema<AssessmentSubmission, mongoose.Model<AssessmentSubmission, any, any, any, mongoose.Document<unknown, any, AssessmentSubmission> & AssessmentSubmission & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, AssessmentSubmission, mongoose.Document<unknown, {}, mongoose.FlatRecord<AssessmentSubmission>> & mongoose.FlatRecord<AssessmentSubmission> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
