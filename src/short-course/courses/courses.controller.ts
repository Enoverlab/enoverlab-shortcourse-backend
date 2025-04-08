import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CoursesService, FileSizeValidationPipe } from './courses.service';
import { AuthGuard } from 'src/short-course/auth/auth.guard';
import { requestObj } from 'src/declarations';
import { createCourseDto, updateCourseTrack } from './courses.dtos';
import {Express} from 'express'
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('courses')
export class CoursesController {
    constructor(private courseService: CoursesService){}

    @HttpCode(HttpStatus.OK)
    @Post('create_course')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('courseImg', {dest : 'uploads/'}))
    createCourse(@Body() courseDetails: createCourseDto, @Req() request:requestObj, @UploadedFile(new FileSizeValidationPipe()) file : Express.Multer.File){
        return this.courseService.createCourse(courseDetails, request, file)
    }


    @HttpCode(HttpStatus.OK)
    @Get('getAllcourse')
    getcourses(@Query('courseLevel') courseLevel : string, @Query('courseName') courseName : string){
        return this.courseService.getAllCourses(courseLevel, courseName)
    }

    @HttpCode(HttpStatus.OK)
    @Get('getcourseById')
    getcourseById(@Query('courseId') courseId : string){
        return this.courseService.getCoursebyId(courseId)
    }

    @HttpCode(HttpStatus.OK)
    @Post('update_course_track')
    @UseGuards(AuthGuard)
    updateCourseTrack(@Body() trackDetails: updateCourseTrack, @Req() request:requestObj){
        return this.courseService.updateCourseTrack(trackDetails, request)
    }

}
