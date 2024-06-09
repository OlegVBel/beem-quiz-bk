import { Module } from '@nestjs/common';
import { AssignesController } from './assignes.controller';
import { AssignesService } from './assignes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Assignes } from './schemas/assignes.schema';

@Module({
  imports: [SequelizeModule.forFeature([Assignes])],
  exports: [AssignesService],
  controllers: [AssignesController],
  providers: [AssignesService],
})
export class AssignesModule {}
