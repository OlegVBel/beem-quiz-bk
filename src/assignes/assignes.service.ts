import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Assignes } from './schemas/assignes.schema';
import { AddAssigneDto } from './dto/add-assigne.dto';
import { Employee } from '../employees/schemas/employee.schema';
import { VideoTest } from '../video-tests/schemas/video-test.schema';
import { Question } from '../questions/schemas/question.schema';
import { File } from '../file/schemas/file.schema';

@Injectable()
export class AssignesService {
  constructor(
    @InjectModel(Assignes)
    private readonly assignesModel: typeof Assignes,
    @InjectModel(Question)
    private readonly questionsModel: typeof Question,
  ) {}

  async getAssignes(videoTestId: string): Promise<Assignes[]> {
    return this.assignesModel.findAll({
      where: { VideoTestId: videoTestId },
      include: {
        model: Employee,
        attributes: ['Email'],
      },
    });
  }

  async addAssigne(addAssigneDto: AddAssigneDto): Promise<Assignes> {
    const assigne = await this.assignesModel.findOne({
      where: { EmployeeId: addAssigneDto.EmployeeId, VideoTestId: addAssigneDto.VideoTestId },
    });
    if (assigne) {
      throw new Error('Employee already assigned to this video test');
    }
    return this.assignesModel.create(addAssigneDto);
  }

  async deleteAssigne(id: string): Promise<void> {
    const assigne = await this.assignesModel.findByPk(id);
    if (!assigne) {
      throw new NotFoundException(`Assigne with id ${id} not found`);
    }
    await assigne.destroy();
  }

  async markPassed(id: string): Promise<Assignes> {
    const assigne = await this.assignesModel.findByPk(id);
    if (!assigne) {
      throw new NotFoundException(`Assigne with id ${id} not found`);
    }
    assigne.IsPassed = true;
    await assigne.save();
    return assigne;
  }

  async markRead(id: string): Promise<Assignes> {
    const assigne = await this.assignesModel.findByPk(id);
    if (!assigne) {
      throw new NotFoundException(`Assigne with id ${id} not found`);
    }
    assigne.IsRead = true;
    await assigne.save();
    return assigne;
  }

  async findEmployeeAssigne(employeeId: string): Promise<Assignes[]> {
    return this.assignesModel.findAll({
      where: { EmployeeId: employeeId, IsPassed: false },
      include: {
        model: VideoTest,
        attributes: ['Id', 'Name', 'Description'],
      },
    });
  }

  async findEmployeeAssignedVideoTests(employeeId: string, videoTestId: string): Promise<any> {
    const assigne = await this.assignesModel.findOne({
      attributes: ['Id'],
      where: { EmployeeId: employeeId, VideoTestId: videoTestId, IsPassed: false, DeletedAt: null },
      include: [
        {
          model: VideoTest,
          attributes: ['Id'],
          where: {
            DeletedAt: null,
          },
          include: [
            {
              model: File,
              as: 'Video',
              attributes: ['Url'],
            },
          ],
        },
      ],
    });
    if (!assigne) {
      throw new NotFoundException(`Assigne for employee with id ${employeeId} not found`);
    }
    const questions = await this.questionsModel.findAll({
      where: { VideoTestId: assigne.VideoTest.Id, DeletedAt: null },
    });

    return {
      Id: assigne.Id,
      VideoUrl: assigne.VideoTest.Video.Url,
      Questions: questions.map(q => ({
        Id: q.Id,
        Time: q.Time,
      })),
    };
  }
}
