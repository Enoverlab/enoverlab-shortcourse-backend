import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class createCourseDto {

    @IsString()
    @IsNotEmpty()
    title : string

    @IsString()
    @IsNotEmpty()
    description : string

    @IsNumber()
    @IsNotEmpty()
    price : number

    @IsString()
    @IsNotEmpty()
    instructorName : string

    @IsString()
    @IsOptional()
    courseImg : string

    @IsString()
    @IsOptional()
    courseLevel ?: string

    @IsArray()
    @IsNotEmpty()
    learningPoints : string[]
}

export class createModuleDto {
    @IsString()
    @IsNotEmpty()
    title : string

    @IsString()
    @IsNotEmpty()
    content : string

    @IsString()
    @IsOptional()
    lessonvideos : string
}

export class getCourseDto {
    @IsNotEmpty()
    courseId : string
}