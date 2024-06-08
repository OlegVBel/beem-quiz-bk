import { IsEmail, IsNotEmpty } from 'class-validator';

export class LogoutEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
