import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetEmployeeDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  notes: string;

  @IsString()
  @IsOptional()
  avatarUrl: string;

  @IsString()
  password: string;
}
