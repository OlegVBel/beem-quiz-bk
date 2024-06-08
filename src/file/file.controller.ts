import { Controller, HttpCode, HttpStatus, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  // @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('file'))
  async uploadFile(@UploadedFiles() files: Express.Multer.File[], @Query('folder') folder?: string) {
    const newFiles = await this.fileService.filterFiles(files);
    const filesInfo = await this.fileService.uploadFiles(newFiles, folder);
    await this.fileService.saveFiles(filesInfo);
  }
}
