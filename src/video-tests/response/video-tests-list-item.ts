import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { QuestionItem } from '../../questions/response/question-item';

export class VideoTestsListItem {
  @IsNumber()
  Id: number;

  @IsString()
  Name: string;

  @IsString()
  Description: string;

  @IsString()
  @IsOptional()
  Options?: string;

  @IsString()
  @IsOptional()
  VideoUrl?: string;

  @IsString()
  @IsOptional()
  PreviewUrl?: string;

  @IsArray()
  @IsOptional()
  QuestionItems?: QuestionItem[];
}
