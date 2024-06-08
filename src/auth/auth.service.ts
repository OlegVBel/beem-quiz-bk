import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmployeesService } from '../employees/employees.service';
import { CreateEmployeeDto } from '../employees/dto/create-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { comparePassword } from '../../helpers/hash';
import { TokenService } from '../token/token.service';
import { AuthUserResponseDto } from './response/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeesService,
    private tokenService: TokenService,
  ) {}

  async registerEmployee(dto: CreateEmployeeDto) {
    const existUser = await this.employeeService.findByEmail(dto.email);
    if (existUser) {
      throw new HttpException('Employee with this email already exists', HttpStatus.BAD_REQUEST);
    }
    return this.employeeService.createEmployee(dto);
  }

  async login(dto: LoginEmployeeDto): Promise<AuthUserResponseDto> {
    const employee = await this.employeeService.findByEmail(dto.email);
    if (!employee) {
      throw new HttpException('Employee with this email not found', HttpStatus.NOT_FOUND);
    }
    if (!(await comparePassword(dto.password, employee.PassHash))) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }
    const token = await this.tokenService.generateJwtToken(dto.email);
    return {
      FirstName: employee.FirstName,
      LastName: employee.LastName,
      Email: employee.Email,
      Token: token,
    };
  }

  // async refreshToken(payload: any) {}

  async logout(payload: any) {
    return this.employeeService.removeRefreshToken(payload.email);
  }
}
