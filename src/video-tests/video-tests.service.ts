import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VideoTest } from './schemas/video-tests.schema';
import { CreateVideoTestDto } from './dto/create-video-test.dto';
import { UpdateVideoTestDto } from './dto/update-video-test.dto';

@Injectable()
export class VideoTestsService {
  constructor(
    @InjectModel(VideoTest)
    private videoTestModel: typeof VideoTest,
  ) {}

  async getVideoTests(): Promise<VideoTest[]> {
    return this.videoTestModel.findAll();
  }

  async getMyVideoTests(employeeId: number): Promise<VideoTest[]> {
    return this.videoTestModel.findAll({ where: { EmployeeId: employeeId } });
  }

  async createVideoTest(createVideoTestDto: CreateVideoTestDto): Promise<VideoTest> {
    return this.videoTestModel.create(createVideoTestDto);
  }

  async getVideoTestById(id: string): Promise<VideoTest> {
    const videoTest = await this.videoTestModel.findByPk(id, {
      include: [],
    });
    if (!videoTest) {
      throw new NotFoundException('Video test not found');
    }
    return videoTest;
  }

  async updateVideoTest(id: string, updateVideoTestDto: UpdateVideoTestDto): Promise<VideoTest> {
    const videoTest = await this.getVideoTestById(id);
    await videoTest.update(updateVideoTestDto);
    return videoTest;
  }

  async deleteVideoTest(id: string): Promise<void> {
    const videoTest = await this.getVideoTestById(id);
    videoTest.DeletedAt = new Date();
    videoTest.UpdatedAt = new Date();
    await videoTest.save();
  }
}
