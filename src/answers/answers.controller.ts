import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { SaveAnswerDto } from './dto/save-answers.dto';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  async saveAnswers(@Body() answers: SaveAnswerDto[]) {
    await this.answersService.saveAnswers(answers);
  }

  @Get(':employeeId/report')
  async getEmployeeTestScore(@Param('employeeId') employeeId: string) {
    return this.answersService.getEmployeeTestsReport(+employeeId);
  }
}
