import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { VideoTestsService } from './video-tests.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateVideoTestDto } from './dto/create-video-test.dto';
import { UpdateVideoTestDto } from './dto/update-video-test.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from '../file/file.service';

@Controller('video-tests')
export class VideoTestsController {
  constructor(
    private readonly videoTestsService: VideoTestsService,
    @Inject(FileService) private readonly fileService: FileService,
  ) {}

  @Get()
  async getVideoTests() {
    return this.videoTestsService.getVideoTests();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyVideoTests(@Req() req) {
    const employeeId = req.query.employeeId;
    return this.videoTestsService.getMyVideoTests(employeeId);
  }

  @Get(':id')
  async getVideoTestById(@Param('id') id: number) {
    return this.videoTestsService.getVideoTestById(id);
  }

  @Put(':id')
  async updateVideoTest(@Param('id') id: number, @Body() updateVideoTestDto: UpdateVideoTestDto) {
    return this.videoTestsService.updateVideoTest(id, updateVideoTestDto);
  }

  @Post()
  async createVideoTest(@Body() createVideoTestDto: CreateVideoTestDto) {
    return this.videoTestsService.createVideoTest(createVideoTestDto);
  }

  @Post(':id/upload-video')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('file'))
  async uploadPhoto(@UploadedFiles() files: Express.Multer.File[], @Param('id') id: number) {
    const [newFile] = await this.fileService.filterFiles(files);
    const [fileInfo] = await this.fileService.uploadFiles([newFile], 'tests-videos');
    const [savedFile] = await this.fileService.saveFiles([fileInfo]);

    return this.videoTestsService.uploadVideo(id, savedFile.Id);
  }

  @Post(':id/upload-preview')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('file'))
  async uploadPreview(@UploadedFiles() files: Express.Multer.File[], @Param('id') id: number) {
    // save file
    const [newFile] = await this.fileService.filterFiles(files);
    const [fileInfo] = await this.fileService.uploadFiles([newFile], 'tests-previews');
    const [savedFile] = await this.fileService.saveFiles([fileInfo]);

    return this.videoTestsService.uploadPreview(id, savedFile.Id);
  }

  @Delete(':id')
  async deleteVideoTest(@Param('id') id: number) {
    return this.videoTestsService.deleteVideoTest(id);
  }
}
