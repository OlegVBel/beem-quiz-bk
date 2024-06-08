import { IsString } from 'class-validator';

export class AuthUserResponseDto {
  @IsString()
  Email: string;

  @IsString()
  Token: string;
}
