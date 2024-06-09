import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { VideoTestsService } from './video-tests.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateVideoTestDto } from './dto/create-video-test.dto';
import { UpdateVideoTestDto } from './dto/update-video-test.dto';

@Controller('video-tests')
export class VideoTestsController {
  constructor(private readonly videoTestsService: VideoTestsService) {}

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

  @Delete(':id')
  async deleteVideoTest(@Param('id') id: number) {
    return this.videoTestsService.deleteVideoTest(id);
  }
}
