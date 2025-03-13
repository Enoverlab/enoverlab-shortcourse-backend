export declare class userDto {
    email: string;
    name: string;
    phone_number: string;
}
export declare class SubmitAssessmentDto {
    userId: string;
    answers: {
        questionId: string;
        selectedOption: string;
    }[];
    score: {
        aspect: string;
        percentageScore: string;
    }[];
    feedback?: string;
}
