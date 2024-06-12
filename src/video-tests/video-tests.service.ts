import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VideoTest } from './schemas/video-test.schema';
import { CreateVideoTestDto } from './dto/create-video-test.dto';
import { UpdateVideoTestDto } from './dto/update-video-test.dto';
import { Question, QuestionType } from '../questions/schemas/question.schema';
import { File } from '../file/schemas/file.schema';
import { VideoTestsListItem } from './response/video-tests-list-item';

@Injectable()
export class VideoTestsService {
  constructor(
    @InjectModel(VideoTest)
    private videoTestModel: typeof VideoTest,
  ) {}

  async getVideoTests(): Promise<VideoTest[]> {
    return this.videoTestModel.findAll();
  }

  async getMyVideoTests(employeeId: number): Promise<VideoTestsListItem[]> {
    const list = await this.videoTestModel.findAll({
      where: { EmployeeId: employeeId },
      include: [
        {
          model: File,
          as: 'Video',
          attributes: ['Url'],
        },
        {
          model: File,
          as: 'Preview',
          attributes: ['Url'],
        },
      ],
    });
    return list.map(item => ({
      Id: item.Id,
      Name: item.Name,
      Description: item.Description,
      Options: item.Options,
      VideoUrl: item.Video?.Url,
      PreviewUrl: item.Preview?.Url,
    }));
  }

  async createVideoTest(createVideoTestDto: CreateVideoTestDto): Promise<VideoTest> {
    return this.videoTestModel.create(createVideoTestDto);
  }

  async getVideoTestById(id: number): Promise<VideoTestsListItem> {
    const videoTest = await this.videoTestModel.findOne({
      where: { Id: id },
      include: [
        {
          model: Question,
          attributes: ['Id', 'Time', 'Type', 'Question', 'Variants'],
          required: false,
          as: 'Questions',
        },
        {
          model: File,
          as: 'Video',
          attributes: ['Url'],
        },
        {
          model: File,
          as: 'Preview',
          attributes: ['Url'],
        },
      ],
    });
    if (!videoTest) {
      throw new NotFoundException('Відео-тест незнайдено');
    }
    return {
      Id: videoTest.Id,
      Name: videoTest.Name,
      Description: videoTest.Description,
      Options: videoTest.Options,
      VideoUrl: videoTest.Video?.Url,
      PreviewUrl: videoTest.Preview?.Url,
      QuestionItems: videoTest.Questions.map(question => ({
        Id: question.Id as number,
        Time: question.Time as number,
        Type: question.Type as QuestionType,
        Question: question.Question,
        Variants: question.Variants ? JSON.parse(question.Variants) : undefined,
      })),
    };
  }

  async updateVideoTest(id: number, updateVideoTestDto: UpdateVideoTestDto): Promise<VideoTest> {
    await this.videoTestModel.update(
      {
        ...updateVideoTestDto,
        UpdatedAt: new Date(),
      },
      {
        where: { Id: id },
      },
    );
    return this.videoTestModel.findByPk(id);
  }

  async uploadPreview(id: number, fileId: number): Promise<void> {
    await this.videoTestModel.update(
      {
        PreviewId: fileId,
        UpdatedAt: new Date(),
      },
      {
        where: { Id: id },
      },
    );
  }

  async uploadVideo(id: number, fileId: number): Promise<void> {
    await this.videoTestModel.update(
      {
        VideoId: fileId,
        UpdatedAt: new Date(),
      },
      {
        where: { Id: id },
      },
    );
  }

  async deleteVideoTest(id: number): Promise<void> {
    await this.videoTestModel.update(
      {
        DeletedAt: new Date(),
        UpdatedAt: new Date(),
      },
      {
        where: { Id: id },
      },
    );
  }
}
