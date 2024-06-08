import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmployeesService } from '../employees/employees.service';
import { CreateEmployeeDto } from '../employees/dto/create-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { comparePassword } from '../../helpers/hash';
import { TokenService } from '../token/token.service';
import { AuthUserResponseDto } from './response/auth-user.dto';
import { LogoutEmployeeDto } from './dto/logout-employee.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

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
    await this.employeeService.createEmployee(dto);
    const token = await this.tokenService.generateJwtToken(dto.email);
    await this.employeeService.saveEmployeeToken(dto.email, token);
    return {
      Email: dto.email,
      Token: token,
    };
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
    await this.employeeService.saveEmployeeToken(dto.email, token);

    return {
      Email: employee.Email,
      Token: token,
    };
  }

  async refreshToken(dto: RefreshTokenDto) {
    const employee = await this.employeeService.findByEmail(dto.email);
    if (!employee) {
      throw new HttpException('Employee with this token not found', HttpStatus.NOT_FOUND);
    }
    const newToken = await this.tokenService.generateJwtToken(employee.Email);
    await this.employeeService.saveEmployeeToken(employee.Email, newToken);
  }

  async logout(dto: LogoutEmployeeDto) {
    return this.employeeService.saveEmployeeToken(dto.email, '');
  }
}
