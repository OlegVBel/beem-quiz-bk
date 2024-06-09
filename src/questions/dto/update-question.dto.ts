import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { QuestionType } from '../schemas/question.schema';

export class UpdateQuestionDto {
  @IsNumber()
  @IsNotEmpty()
  VideoTestId: number;

  @IsNumber()
  @IsNotEmpty()
  Time: number;

  @IsEnum(QuestionType)
  @IsNotEmpty()
  Type: QuestionType;

  @IsString()
  @IsNotEmpty()
  Question: string;

  @IsString()
  @IsOptional()
  Variants?: string;
}
