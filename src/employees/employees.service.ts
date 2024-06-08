import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Employee } from './schemas/employee.schema';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { hashPassword } from '../../helpers/hash';

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

  async findByEmail(email: string) {
    const employee = this.employeeModel.findOne({ where: { Email: email } });
    if (!employee) {
      throw new HttpException('Employee with this email not found', HttpStatus.NOT_FOUND);
    }
    return employee;
  }

  async findByRefreshTokenId(tokenId: string) {
    const employee = this.employeeModel.findOne({ where: { RefreshToken: tokenId } });
    if (!employee) {
      throw new HttpException('Employee with this token not found', HttpStatus.NOT_FOUND);
    }
    return employee;
  }
  async removeRefreshToken(email: string) {
    await this.employeeModel.update({ RefreshToken: '' }, { where: { Email: email } });
  }
  async saveRefreshToken(email: string, tokenId: string) {
    await this.employeeModel.update({ RefreshToken: tokenId }, { where: { Email: email } });
  }
}
