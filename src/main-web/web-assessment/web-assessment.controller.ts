import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { WebAssessmentService } from './web-assessment.service';
import { userDto } from './dto/web-assessment.dto';

@Controller('web-assessment')
export class WebAssessmentController {
    constructor(private assessmentService:WebAssessmentService){}

    @HttpCode(HttpStatus.OK)
    @Post('onboarding')
    createUser(@Body() userDto: userDto){
        return this.assessmentService.createNewUserAssessment(userDto)
    }

    @HttpCode(HttpStatus.OK)
    @Get('questions')
    getAssessment(@Query('userId') userId: string){
        return this.assessmentService.getAssessmentQuestions(userId)
    }

    @HttpCode(HttpStatus.OK)
    @Get('assessment-result')
    submitAssessment(@Query('userId') userId : string){
        return this.assessmentService.getAssessmentResult(userId)
    }
}
