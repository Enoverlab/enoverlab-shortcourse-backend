import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AssessmentSubmission, UserAssessment, assessmentQuestion } from './web-assessment.schema';
import { Model,Types } from 'mongoose';
import { SubmitAssessmentDto, userDto } from './dto/web-assessment.dto';

@Injectable()
export class WebAssessmentService {
    constructor(
        @InjectModel(UserAssessment.name) private UserAssessmentModel: Model<UserAssessment>,@InjectModel(AssessmentSubmission.name) private AssessmentSubmissionModel: Model<AssessmentSubmission>,@InjectModel(assessmentQuestion.name) private assessmentQuestionModel: Model<assessmentQuestion>
    ) {}
    async createNewUserAssessment(userDto : userDto):Promise<UserAssessment>{
        let userInfo
        const {email} = userDto

        userInfo = await this.UserAssessmentModel.findOne({email})

        if(!userInfo){
            userInfo = new this.UserAssessmentModel(userDto)
            userInfo.save()
        }

        return userInfo._id

    }
    async gradeUserAssessment(userId,userSubmission){
        try {
            const isValidId = Types.ObjectId.isValid(userId);
            const userInfo = await this.UserAssessmentModel.findById(userId)
            if(!isValidId || !userInfo){
                throw new HttpException('User not found', 404);
            }
            const {dataId,userData} = userSubmission
            const assessment = await this.assessmentQuestionModel.findById(dataId).lean();
            if (!assessment) throw new NotFoundException('Assessment not found');
        
            const aspectScores: Record<string, { total: number; correct: number }> = {};
            const resultChoices : Record<string,{question : string, selectedOption : string | string[], correctAnswer : string | string[]}> = {}
        
            // ✅ Iterate through the questions & compare user answers
            for (const question of assessment.questions) {
                const questionId = question._id.toString();
              const userAnswer = userData[questionId]; // Get user submission for this question
              const correctAnswers = question.correctAnswer.map(String); // Convert correct answers to strings
        
              // Initialize aspect if not already
              if (!aspectScores[question.aspect]) {
                aspectScores[question.aspect] = { total: 0, correct: 0 };
              }
              aspectScores[question.aspect].total += 1;
              resultChoices[questionId] = {
                question : question.question,
                selectedOption: userAnswer,
                correctAnswer: question.multipleAnswers ? correctAnswers : correctAnswers[0],
            };
        
              // ✅ Check correctness based on multipleAnswers flag
              const isCorrect = question.multipleAnswers
                ? Array.isArray(userAnswer) && userAnswer.every(ans => correctAnswers.includes(ans)) && userAnswer.length === correctAnswers.length
                : correctAnswers.includes(userAnswer);
              
        
              if (isCorrect) {
                aspectScores[question.aspect].correct += 1;
              }
            }
        
            // ✅ Compute percentage scores for each aspect
            const categorizedResults = Object.entries(aspectScores).map(([aspect, { total, correct }]) => ({
              aspect,
              percentageScore: ((correct / total) * 100).toFixed(2) + '%',
            }));
            const results = Object.entries(resultChoices).map(([questionId, {selectedOption,correctAnswer,question}])=>({
                questionId, selectedOption, correctAnswer, question
            }))

            const totalCorrect = Object.values(aspectScores).reduce((sum, { correct }) => sum + correct, 0);
            const totalQuestions = Object.values(aspectScores).reduce((sum, { total }) => sum + total, 0);

            const totalPercentage = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(2) + '%' : '0%';
            const feedback = `Your Total score for the Product Management Assessment is ${totalPercentage}%.`
            const submission = new this.AssessmentSubmissionModel({
                userId,
                answers : results,
                score : [...categorizedResults, {aspect : 'total', percentageScore : totalPercentage}],
                feedback
            })

            await submission.save()

            return 'Submission Successful'
        } catch (error) {
            throw new HttpException(error.message,400)
        }
    }
    async getAssessmentQuestions(userId):Promise<assessmentQuestion>{
        try {
            const isValidId = Types.ObjectId.isValid(userId);
            const userInfo = await this.UserAssessmentModel.findById(userId)
            if(!isValidId || !userInfo){
                throw new HttpException('User not found', 404);
            }
            const assessmentQuestion = this.assessmentQuestionModel.findOne({active : true}).sort({ createdAt: -1 })
            return assessmentQuestion
        } catch (error) {
            console.log(error)
            throw new HttpException('User not found', 404);
        }
    }

    
    // async getUserAssessments(userId: string): Promise<Assessment[]> {
    // return this.assessmentModel.find({ userId }).exec();
    // }
    
    async getAssessmentResult(userId): Promise<AssessmentSubmission> {
        const isValidId = Types.ObjectId.isValid(userId);
        const userInfo = await this.UserAssessmentModel.findById(userId)
        if(!isValidId || !userInfo){
            throw new HttpException('User not found', 404);
        }
        const assessment = await this.AssessmentSubmissionModel.findOne({userId}).sort({ createdAt: -1 });
        if (!assessment) {
            throw new NotFoundException('Assessment not found');
        }
        return assessment;
    }
}
