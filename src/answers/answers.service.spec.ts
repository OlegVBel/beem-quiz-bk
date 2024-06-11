import { Test, TestingModule } from '@nestjs/testing';
import { AnswersService } from './answers.service';
import { getModelToken } from '@nestjs/sequelize';
import { Answer } from './schemas/questions.schema';
import { Question } from '../questions/schemas/question.schema';
import { VideoTest } from '../video-tests/schemas/video-test.schema';
import { Employee } from '../employees/schemas/employee.schema';

describe('AnswersService', () => {
  let service: AnswersService;
  let mockAnswerModel;
  let mockQuestionModel;
  let mockVideoTestModel;
  let mockEmployeeModel;

  beforeEach(async () => {
    mockAnswerModel = {
      findAll: jest.fn(),
    };

    mockQuestionModel = {
      findAll: jest.fn(),
    };

    mockVideoTestModel = {
      findAll: jest.fn(),
    };

    mockEmployeeModel = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswersService,
        { provide: getModelToken(Answer), useValue: mockAnswerModel },
        { provide: getModelToken(Question), useValue: mockQuestionModel },
        { provide: getModelToken(VideoTest), useValue: mockVideoTestModel },
        { provide: getModelToken(Employee), useValue: mockEmployeeModel },
      ],
    }).compile();

    service = module.get<AnswersService>(AnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getEmployeeTestsReport', () => {
    it('should return the correct report', async () => {
      const mockQuestions = [
        {
          Id: 1,
          VideoTestId: '1',
          DeletedAt: null,
          Variants: JSON.stringify([
            { answer: 'A', isCorrect: true },
            { answer: 'B', isCorrect: false },
          ]),
        },
        {
          Id: 2,
          VideoTestId: '1',
          DeletedAt: null,
          Variants: JSON.stringify([
            { answer: 'C', isCorrect: true },
            { answer: 'D', isCorrect: true },
          ]),
        },
      ];

      const mockAnswers = [
        { EmployeeId: '1', QuestionId: 1, Answers: JSON.stringify(['A']) },
        { EmployeeId: '1', QuestionId: 2, Answers: JSON.stringify(['C', 'D']) },
      ];

      const mockEmployeeVideoTests = [
        {
          EmployeeId: '1',
          Id: 1,
          Name: 'Test 1',
          Description: 'Test Description',
          Questions: mockQuestions,
        },
      ];

      const mockEmployees = [{ Id: '1', FirstName: 'John', LastName: 'Doe', Email: 'john.doe@example.com' }];

      mockVideoTestModel.findAll.mockReturnValue(mockEmployeeVideoTests);
      mockAnswerModel.findAll.mockReturnValue(mockAnswers);
      mockEmployeeModel.findAll.mockReturnValue(mockEmployees);

      const report = await service.getEmployeeTestsReport(1);

      expect(report).toEqual([
        {
          Employee: {
            FirstName: mockEmployees[0].FirstName,
            LastName: mockEmployees[0].LastName,
            Email: mockEmployees[0].Email,
          },
          TestName: mockEmployeeVideoTests[0].Name,
          TestDescription: mockEmployeeVideoTests[0].Description,
          Answers: [
            {
              Question: mockQuestions[0],
              Answers: [{ Answer: 'A', IsCorrect: true }],
            },
            {
              Question: mockQuestions[1],
              Answers: [
                { Answer: 'C', IsCorrect: true },
                { Answer: 'D', IsCorrect: true },
              ],
            },
          ],
        },
      ]);
    });

    it('should handle no questions found', async () => {
      mockVideoTestModel.findAll.mockReturnValue([]);
      mockAnswerModel.findAll.mockReturnValue([]);
      mockEmployeeModel.findAll.mockReturnValue([]);

      const report = await service.getEmployeeTestsReport(1);

      expect(report).toEqual([]);
    });
  });
});
