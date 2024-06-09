import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('/batch')
  async getQuestions(@Query('ids') ids: string) {
    const idArray = ids.split(',').map(id => +id); // Перетворюємо ids на масив чисел
    return this.questionsService.getQuestionsByIds(idArray);
  }

  @Get(':testId')
  async getQuestionsByVideoTestId(@Param('testId') testId: string) {
    return this.questionsService.getQuestionsByVideoTestId(testId);
  }

  @Post()
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.createQuestion(createQuestionDto);
  }

  @Put(':id')
  async updateQuestion(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.updateQuestion(id, updateQuestionDto);
  }

  @Get(':id')
  async getQuestion(@Param('id') id: string) {
    return this.questionsService.getQuestionById(id);
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: string) {
    return this.questionsService.deleteQuestion(id);
  }
}
