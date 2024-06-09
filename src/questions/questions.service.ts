import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './schemas/question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionItem } from './response/question-item';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question)
    private questionModel: typeof Question,
  ) {}

  async getQuestionsByVideoTestId(testId: string): Promise<QuestionItem[]> {
    const questions = await this.questionModel.findAll({ where: { VideoTestId: testId, DeletedAt: null } });
    return questions.map(question => ({
      Id: question.Id,
      Time: question.Time,
      Question: question.Question,
      Type: question.Type,
      Variants: question.Variants ? JSON.parse(question.Variants) : null,
    }));
  }

  async createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.questionModel.create({
      Time: createQuestionDto.Time,
      Question: createQuestionDto.Question,
      Type: createQuestionDto.Type,
      VideoTestId: createQuestionDto.VideoTestId,
      Variants: createQuestionDto.Variants ? JSON.stringify(createQuestionDto.Variants) : null,
    });
  }

  async getQuestionById(id: string): Promise<Question> {
    const question = await this.questionModel.findByPk(id);
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return question;
  }

  async updateQuestion(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    const question = await this.getQuestionById(id);
    await question.update({
      Time: updateQuestionDto.Time,
      Question: updateQuestionDto.Question,
      Type: updateQuestionDto.Type,
      VideoTestId: updateQuestionDto.VideoTestId,
      Variants: updateQuestionDto.Variants ? JSON.stringify(updateQuestionDto.Variants) : null,
    });
    return question;
  }

  async deleteQuestion(id: string): Promise<void> {
    const question = await this.getQuestionById(id);
    await question.destroy();
  }

  async getQuestionsByIds(ids: number[]): Promise<any> {
    const questions = await this.questionModel.findAll({ where: { Id: ids, DeletedAt: null } });
    return questions.map(question => ({
      Id: question.Id,
      Time: question.Time,
      Question: question.Question,
      Type: question.Type,
      Variants: question.Variants
        ? JSON.parse(question.Variants).map((variant: { answer: string }) => ({
            answer: variant.answer,
          }))
        : null,
    }));
  }
}
