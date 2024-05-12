import { Module } from '@nestjs/common';
import { Employee } from './schemas/employee.schema';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Employee])],
  exports: [SequelizeModule],
})
export class EmployeesModule {}
