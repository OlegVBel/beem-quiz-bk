import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Employee } from './schemas/employee.schema';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { hashPassword } from '../../helpers/hash';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { GetEmployeeDto } from './dto/get-employee.dto';
import { File } from '../file/schemas/file.schema';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee)
    private employeeModel: typeof Employee,
  ) {}

  async createEmployee(dto: CreateEmployeeDto): Promise<CreateEmployeeDto> {
    const hashedPassword = await hashPassword(dto.password);
    const employee = new Employee({
      Email: dto.email,
      PassHash: hashedPassword,
    });

    await employee.save();
    return {
      email: employee.Email,
      password: employee.PassHash,
    };
  }

  async findByEmail(email: string): Promise<GetEmployeeDto> {
    const employee = await this.employeeModel.findOne({
      where: { Email: email },
      include: {
        model: File,
        attributes: ['Url'],
        required: false,
        as: 'Avatar',
      },
    });
    if (!employee) {
      throw new HttpException('Користувача з даною поштою не знайдено', HttpStatus.NOT_FOUND);
    }
    return {
      id: employee.Id,
      firstName: employee.FirstName,
      lastName: employee.LastName,
      notes: employee.Notes,
      email: employee.Email,
      password: employee.PassHash,
      avatarUrl: employee.Avatar?.Url,
    };
  }

  async saveEmployeeToken(email: string, token: string) {
    await this.employeeModel.update({ RefreshToken: token }, { where: { Email: email } });
  }

  async saveEmployeePhoto(email: string, avatarId: number) {
    await this.employeeModel.update({ AvatarId: avatarId }, { where: { Email: email } });
  }

  async updateEmployee(dto: UpdateEmployeeDto) {
    await this.employeeModel.update(
      {
        FirstName: dto.firstName,
        LastName: dto.lastName,
        Notes: dto.notes,
      },
      {
        where: { Email: dto.email },
      },
    );
  }
}
