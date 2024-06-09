import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './schemas/question.schema';

@Module({
  imports: [SequelizeModule.forFeature([Question])],
  exports: [SequelizeModule, QuestionsModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
