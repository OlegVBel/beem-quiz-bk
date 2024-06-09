import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './schemas/question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question)
    private questionModel: typeof Question,
  ) {}

  async createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.questionModel.create(createQuestionDto);
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
    await question.update(updateQuestionDto);
    return question;
  }

  async deleteQuestion(id: string): Promise<void> {
    const question = await this.getQuestionById(id);
    question.DeletedAt = new Date();
    question.UpdatedAt = new Date();
    await question.save();
  }
}
