import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { EmployeesService } from '../employees/employees.service';
import { TokenService } from '../token/token.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let mockEmployeeService: Partial<EmployeesService>;
  let mockTokenService: Partial<TokenService>;

  beforeEach(async () => {
    mockEmployeeService = {
      findByEmail: jest.fn(),
      createEmployee: jest.fn(),
      saveEmployeeToken: jest.fn(),
    };

    mockTokenService = {
      generateJwtToken: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: EmployeesService, useValue: mockEmployeeService }, { provide: TokenService, useValue: mockTokenService }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should register a new employee', async () => {
    const dto = { email: 'test@test.com' };
    jest.spyOn(mockEmployeeService, 'findByEmail').mockResolvedValueOnce(null);
    jest.spyOn(mockEmployeeService, 'createEmployee').mockResolvedValueOnce({
      email: 'test@eamil.com',
      password: '1111',
    });

    expect(await service.registerEmployee(dto as any)).toStrictEqual({
      email: 'test@eamil.com',
      password: '1111',
    });
  });

  it('should throw an error if employee already exists', async () => {
    const dto = { email: 'test@test.com' };
    jest.spyOn(mockEmployeeService, 'findByEmail').mockResolvedValueOnce({} as any);

    await expect(service.registerEmployee(dto as any)).rejects.toThrow(new HttpException('Employee with this email already exists', HttpStatus.BAD_REQUEST));
  });

  it('should login an employee', async () => {
    const dto = { email: 'test@test.com', password: '111111' };
    const employee = { Email: 'test@test.com', PassHash: '$2b$12$09VBzO81lbgntLQyxryoAu717IYgpz4XYJThBnWcy2jWd8ZUtQWk.', FirstName: 'Test', LastName: 'User' };
    jest.spyOn(mockEmployeeService, 'findByEmail').mockResolvedValueOnce(employee as any);
    jest.spyOn(mockTokenService, 'generateJwtToken').mockResolvedValueOnce('token');

    const result = await service.login(dto);
    expect(result).toEqual({
      FirstName: 'Test',
      LastName: 'User',
      Email: 'test@test.com',
      Token: 'token',
    });
  });

  it('should throw an error if employee not found during login', async () => {
    const dto = { email: 'test@test.com', password: 'password' };
    jest.spyOn(mockEmployeeService, 'findByEmail').mockResolvedValueOnce(null);

    await expect(service.login(dto)).rejects.toThrow(new HttpException('Employee with this email not found', HttpStatus.NOT_FOUND));
  });

  it('should refresh token', async () => {
    const dto = { email: 'test@test.com' };
    const employee = { Email: 'test@test.com' };
    jest.spyOn(mockEmployeeService, 'findByEmail').mockResolvedValueOnce(employee as any);
    jest.spyOn(mockTokenService, 'generateJwtToken').mockResolvedValueOnce('newToken');

    await service.refreshToken(dto);
    expect(mockEmployeeService.saveEmployeeToken).toHaveBeenCalledWith('test@test.com', 'newToken');
  });

  it('should logout an employee', async () => {
    const dto = { email: 'test@test.com' };

    await service.logout(dto);
    expect(mockEmployeeService.saveEmployeeToken).toHaveBeenCalledWith('test@test.com', '');
  });
});
