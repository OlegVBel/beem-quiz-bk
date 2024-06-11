import { Injectable } from '@nestjs/common';
import { SaveAnswerDto } from './dto/save-answers.dto';
import { Answer } from './schemas/questions.schema';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from '../questions/schemas/question.schema';
import { VideoTest } from '../video-tests/schemas/video-test.schema';
import { Employee } from '../employees/schemas/employee.schema';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer) private readonly answerModel: typeof Answer,
    @InjectModel(Question) private readonly questionModel: typeof Question,
    @InjectModel(VideoTest) private readonly videoTestModel: typeof VideoTest,
    @InjectModel(Employee) private readonly employeeModel: typeof Employee,
  ) {}

  async saveAnswers(answers: SaveAnswerDto[]) {
    await this.answerModel.bulkCreate(
      answers.map(answer => ({
        EmployeeId: answer.EmployeeId,
        QuestionId: answer.QuestionId,
        Answers: JSON.stringify(answer.Answers),
      })),
    );
  }

  async getEmployeeTestsReport(employeeId: number) {
    const employeeVideoTests = await this.videoTestModel.findAll({
      where: { EmployeeId: employeeId, DeletedAt: null },
      include: [
        {
          model: Question,
          as: 'Questions',
          where: { DeletedAt: null },
        },
      ],
    });

    const questionsIds = [];
    for (const employeeVideoTest of employeeVideoTests) {
      questionsIds.push(...employeeVideoTest.Questions.map(question => question.Id));
    }

    const answers = await this.answerModel.findAll({
      where: {
        QuestionId: questionsIds,
      },
    });

    const employeeUniqIds = [...new Set(answers.map(answer => answer.EmployeeId))];
    const employees = await this.employeeModel.findAll({
      where: { Id: employeeUniqIds },
    });

    const report = [];
    for (const employeeVideoTest of employeeVideoTests) {
      for (const employee of employees) {
        const employeeAnswers = answers.filter(answer => answer.EmployeeId === employee.Id);
        const employeeReportAnswers = [];
        for (const employeeAnswer of employeeAnswers) {
          const question = employeeVideoTest.Questions.find(question => question.Id === employeeAnswer.QuestionId);
          const variants = question.Variants ? JSON.parse(question.Variants) : null;
          const answers = JSON.parse(employeeAnswer.Answers).map(answer => ({
            Answer: answer,
            IsCorrect: variants.find(variant => variant.answer === answer)?.isCorrect || false,
          }));
          employeeReportAnswers.push({
            Question: question,
            Answers: answers,
          });
        }
        report.push({
          Employee: {
            FirstName: employee.FirstName,
            LastName: employee.LastName,
            Email: employee.Email,
          },
          TestName: employeeVideoTest.Name,
          TestDescription: employeeVideoTest.Description,
          Answers: employeeReportAnswers,
        });
      }
    }

    return report;
  }
}
