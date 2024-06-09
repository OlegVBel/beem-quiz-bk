import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AssignesService } from './assignes.service';
import { AddAssigneDto } from './dto/add-assigne.dto';

@Controller('assignes')
export class AssignesController {
  constructor(private readonly assignesService: AssignesService) {}

  @Get(':videoTestId')
  async getAssignes(@Param('videoTestId') videoTestId: string) {
    return this.assignesService.getAssignes(videoTestId);
  }

  @Post()
  async addAssigne(@Body() addAssigneDto: AddAssigneDto) {
    return this.assignesService.addAssigne(addAssigneDto);
  }

  @Delete(':id')
  async deleteAssigne(@Param('id') id: string) {
    return this.assignesService.deleteAssigne(id);
  }

  @Post(':id/markPassed')
  async markPassed(@Param('id') id: string) {
    return this.assignesService.markPassed(id);
  }

  @Post(':id/markRead')
  async markRead(@Param('id') id: string) {
    return this.assignesService.markRead(id);
  }

  @Get('/employee/:employeeId')
  async findEmployeeAssigne(@Param('employeeId') employeeId: string) {
    return this.assignesService.findEmployeeAssigne(employeeId);
  }
}
