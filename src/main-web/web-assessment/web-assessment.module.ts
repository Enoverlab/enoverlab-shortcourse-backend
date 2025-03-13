import { Module } from '@nestjs/common';
import { WebAssessmentController } from './web-assessment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AssessmentSubmission, AssessmentSubmissionSchema, UserAssessment, UserAssessmentSchema, assessmentQuestion, assessmentQuestionSchema } from './web-assessment.schema';
import { WebAssessmentService } from './web-assessment.service';

@Module({
  imports : [
    MongooseModule.forFeature([{
      name : UserAssessment.name,
      schema : UserAssessmentSchema
    }, {
      name : AssessmentSubmission.name,
      schema : AssessmentSubmissionSchema
    },
    {
      name : assessmentQuestion.name,
      schema : assessmentQuestionSchema
    },
  ])
  ],
  controllers: [WebAssessmentController],
  providers: [WebAssessmentService]
})
export class WebAssessmentModule {}
