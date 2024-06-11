import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AssignesService } from './assignes.service';
import { AddAssigneDto } from './dto/add-assigne.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('assignes')
export class AssignesController {
  constructor(private readonly assignesService: AssignesService) {}

  @Get(':videoTestId')
  async getAssignes(@Param('videoTestId') videoTestId: string) {
    return this.assignesService.getAssignes(videoTestId);
  }

  @Get('/video/:videoTestId/:employeeId')
  async getEmployeeAssignedVideo(@Param('videoTestId') videoTestId: string, @Param('employeeId') employeeId: string) {
    return this.assignesService.findEmployeeAssignedVideoTests(employeeId, videoTestId);
  }

  @Put(':employeeId/:videoTestId/markAsRead')
  async markAssignesAsRead(@Param('employeeId') employeeId: string, @Param('videoTestId') videoTestId: string) {
    return this.assignesService.markAssignesAsRead(employeeId, videoTestId);
  }

  @Put(':employeeId/:videoTestId/markAsPassed')
  async markAssignesAsPassed(@Param('employeeId') employeeId: string, @Param('videoTestId') videoTestId: string) {
    return this.assignesService.markAssignesAsPassed(employeeId, videoTestId);
  }

  @Post()
  async addAssigne(@Body() addAssigneDto: AddAssigneDto) {
    return this.assignesService.addAssigne(addAssigneDto);
  }

  @Delete(':id')
  async deleteAssigne(@Param('id') id: string) {
    return this.assignesService.deleteAssigne(id);
  }

  @Get(':employeeId/employee')
  async findEmployeeAssigne(@Param('employeeId') employeeId: string) {
    return this.assignesService.findEmployeeAssigne(employeeId);
  }
}
