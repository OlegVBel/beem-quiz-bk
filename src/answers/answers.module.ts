import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from './schemas/questions.schema';
import { Question } from '../questions/schemas/question.schema';
import { VideoTest } from '../video-tests/schemas/video-test.schema';
import { Employee } from '../employees/schemas/employee.schema';

@Module({
  imports: [SequelizeModule.forFeature([Answer, Question, VideoTest, Employee])],
  exports: [AnswersService],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
