import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddAssigneDto {
  @IsNotEmpty()
  @IsNumber()
  readonly EmployeeId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly VideoTestId: number;
}
