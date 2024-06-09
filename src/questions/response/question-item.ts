import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { QuestionType, QuestionVariantType } from '../schemas/question.schema';

export class QuestionItem {
  @IsNumber()
  Id: number;

  @IsString()
  Time: number;

  @IsString()
  Type: QuestionType;

  @IsString()
  Question: string;

  @IsArray()
  @IsOptional()
  Variants?: QuestionVariantType[];
}
