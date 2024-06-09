import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVideoTestDto {
  @IsNumber()
  @IsNotEmpty()
  EmployeeId: number;

  @IsString()
  @IsOptional()
  Name?: string;

  @IsString()
  @IsOptional()
  Description?: string;

  @IsString()
  @IsOptional()
  Options?: string;
}
