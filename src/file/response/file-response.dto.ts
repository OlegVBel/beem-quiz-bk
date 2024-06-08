import { IsString } from 'class-validator';

export class FileResponse {
  @IsString()
  name: string;

  @IsString()
  url: string;

  @IsString()
  mimetype: string;

  @IsString()
  originalname: string;

  @IsString()
  size: number;
}
