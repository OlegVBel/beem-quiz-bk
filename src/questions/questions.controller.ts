import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async getQuestions() {
    return this.questionsService.getQuestions();
  }

  @Post()
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.createQuestion(createQuestionDto);
  }

  @Get(':id')
  async getQuestion(@Param('id') id: string) {
    return this.questionsService.getQuestionById(id);
  }

  @Put(':id')
  async updateQuestion(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.updateQuestion(id, updateQuestionDto);
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: string) {
    return this.questionsService.deleteQuestion(id);
  }
}
