import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Assignes } from './schemas/assignes.schema';
import { AddAssigneDto } from './dto/add-assigne.dto';
import { Employee } from '../employees/schemas/employee.schema';
import { VideoTest } from '../video-tests/schemas/video-test.schema';

@Injectable()
export class AssignesService {
  constructor(
    @InjectModel(Assignes)
    private readonly assignesModel: typeof Assignes,
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
}
