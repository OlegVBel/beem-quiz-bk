import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmployeeAvatarDto {
  @IsNotEmpty()
  @IsString()
  readonly avatar: string;
}
