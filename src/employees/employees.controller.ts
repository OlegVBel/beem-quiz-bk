import { Body, Controller, HttpCode, HttpStatus, Inject, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from '../file/file.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@UseGuards(JwtAuthGuard)
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    @Inject(FileService) private readonly fileService: FileService,
  ) {}

  @Post('upload-photo')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('file'))
  async uploadPhoto(@UploadedFiles() files: Express.Multer.File[], @Query('email') email: string) {
    const employee = await this.employeesService.findByEmail(email);

    // save file
    const [newFile] = await this.fileService.filterFiles(files);
    const [fileInfo] = await this.fileService.uploadFiles([newFile], 'avatar');
    const [savedFile] = await this.fileService.saveFiles([fileInfo]);

    // save file id to employee avatar
    return this.employeesService.saveEmployeePhoto(employee.email, savedFile.Id);
  }

  @Put('update')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateEmployee(@Body() dto: UpdateEmployeeDto) {
    await this.employeesService.updateEmployee(dto);
  }

  @Post(':email')
  async getByEmail(@Query('email') email: string) {
    const employee = await this.employeesService.findByEmail(email);
    return {
      Id: employee.id,
    };
  }
}
