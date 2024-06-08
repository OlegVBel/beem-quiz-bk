import { Module } from '@nestjs/common';
import { Employee } from './schemas/employee.schema';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';

@Module({
  imports: [SequelizeModule.forFeature([Employee])],
  exports: [SequelizeModule, EmployeesService],
  providers: [EmployeesService],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
