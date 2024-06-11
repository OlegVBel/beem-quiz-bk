import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { SaveAnswerDto } from './dto/save-answers.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  async saveAnswers(@Body() answers: SaveAnswerDto[]) {
    await this.answersService.saveAnswers(answers);
  }

  @Get(':employeeId/:videoTestId/test-result')
  async getTestResult(@Param('videoTestId') videoTestId: string, @Param('employeeId') employeeId: string) {
    return this.answersService.getTestResult(+videoTestId, +employeeId);
  }

  @Get(':employeeId/report')
  async getEmployeeTestScore(@Param('employeeId') employeeId: string) {
    return this.answersService.getEmployeeTestsReport(+employeeId);
  }
}
