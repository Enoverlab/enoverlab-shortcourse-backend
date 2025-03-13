import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({timestamps : true})
export class UserAssessment {
    @Prop({ unique: true, required: true })
    email: string;
  
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    phone_number: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'AssessmentSubmission'})
    AssessmentSubmissions ?: AssessmentSubmission[]
}

@Schema({timestamps : true})
export class AssessmentSubmission{
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserAssessment', required : true})
  userId : UserAssessment

  @Prop({ type: Array, required: true })
  answers: { questionId: string; selectedOption: string | string[]; correctAnswer : string | string[], options : String[] }[];

  @Prop({ type: Array, required: true})
  score: { aspect: string; percentageScore: string }[];

  @Prop()
  feedback?: string;
  
}

@Schema()
export class Question extends Document{
  @Prop({ required: true })
  question: string;

  @Prop({ type: [String], required: true })
  options: string[];

  @Prop({ type: Boolean, default: false })
  multipleAnswers: boolean;

  @Prop({
    type: [String], // Accepts string or array of strings
    required: true,
    validate: {
      validator: function(value) {
        if (!Array.isArray(this.options) || this.options.length === 0) return false;
        if (!this.multipleAnswers  && value.length > 1) {
            throw new Error('Too many correct answers than necessary')
        }
        return Array.isArray(value) && value.every(answer => this.options.includes(answer));
      },
      message: 'Invalid correctAnswer. It must be included in options',
    },
  })
  correctAnswer: string[];

  @Prop({ type: String, enum: ['User Research', 'MVP', 'User Experience', 'Market Value'], required: true })
  aspect: string;
}

// Create schema for Questions
export const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema({ timestamps: true })
export class assessmentQuestion {
  @Prop({ required: true })
  assessmentName: string;

  @Prop({ type: [QuestionSchema], required: true })
  questions: Question[]; 

  @Prop()
  active: boolean; 
}


export const assessmentQuestionSchema = SchemaFactory.createForClass(assessmentQuestion)

export const UserAssessmentSchema = SchemaFactory.createForClass(UserAssessment)

export const AssessmentSubmissionSchema = SchemaFactory.createForClass(AssessmentSubmission)