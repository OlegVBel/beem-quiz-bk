import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly pass: string;
}
