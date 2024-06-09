import { Module } from '@nestjs/common';
import { AssignesController } from './assignes.controller';
import { AssignesService } from './assignes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Assignes } from './schemas/assignes.schema';
import { QuestionsModule } from '../questions/questions.module';

@Module({
  imports: [SequelizeModule.forFeature([Assignes]), QuestionsModule],
  exports: [AssignesService],
  controllers: [AssignesController],
  providers: [AssignesService],
})
export class AssignesModule {}
