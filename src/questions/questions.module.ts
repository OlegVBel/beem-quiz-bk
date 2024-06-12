import { Module, UseGuards } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './schemas/question.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Answer } from '../answers/schemas/questions.schema';

@UseGuards(JwtAuthGuard)
@Module({
  imports: [SequelizeModule.forFeature([Question, Answer])],
  exports: [SequelizeModule, QuestionsModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
