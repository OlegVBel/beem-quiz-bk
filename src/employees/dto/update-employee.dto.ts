import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmployeeDto {
  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  readonly dateOfBirth: Date;

  @IsString()
  readonly notes: string;
}
