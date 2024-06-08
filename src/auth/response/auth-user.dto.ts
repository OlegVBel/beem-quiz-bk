import { IsString } from 'class-validator';

export class AuthUserResponseDto {
  @IsString()
  FirstName: string;

  @IsString()
  LastName: string;

  @IsString()
  Email: string;

  @IsString()
  Token: string;
}
