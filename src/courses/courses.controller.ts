import { Body, Controller, HttpCode, HttpStatus, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CoursesService, FileSizeValidationPipe } from './courses.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { requestObj } from 'src/declarations';
import { createCourseDto } from './courses.dtos';
import {Express} from 'express'
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('courses')
export class CoursesController {
    constructor(private courseService: CoursesService){}

    @HttpCode(HttpStatus.OK)
    @Post('create_course')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('courseImg', {dest : '/uploads'}))
    createCourse(@Body() courseDetails: createCourseDto, @Req() request:requestObj, @UploadedFile(new FileSizeValidationPipe()) file : Express.Multer.File){
        return this.courseService.createCourse(courseDetails, request, file)
    }

    @HttpCode(HttpStatus.OK)
    @Post('create_module')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('courseImg', {dest : '/uploads'}))
    createModule(@Body() courseDetails: createCourseDto, @Req() request:requestObj, @UploadedFile(new FileSizeValidationPipe()) file : Express.Multer.File){
        return this.courseService.createCourse(courseDetails, request, file)
    }

}
