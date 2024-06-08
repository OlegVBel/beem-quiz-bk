import { IsString } from 'class-validator';

export class FileResponse {
  @IsString()
  cipherName: string;

  @IsString()
  url: string;

  @IsString()
  mimetype: string;

  @IsString()
  originalName: string;

  @IsString()
  size: number;
}
