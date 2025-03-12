import { IsString, IsArray, IsOptional, IsEmail } from 'class-validator';

export class userDto{
    @IsEmail()
    email : string

    @IsString()
    name : string

    @IsString()
    phone_number : string
}

export class SubmitAssessmentDto {
  @IsString()
  userId: string;

  @IsArray()
  answers: { questionId: string; selectedOption: string }[];

  @IsArray()
  score: { aspect: string; percentageScore: string }[];

  @IsOptional()
  @IsString()
  feedback?: string;
}