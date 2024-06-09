import { Module } from '@nestjs/common';
import { VideoTestsController } from './video-tests.controller';
import { VideoTestsService } from './video-tests.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { VideoTest } from './schemas/video-test.schema';
import { QuestionsModule } from '../questions/questions.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [SequelizeModule.forFeature([VideoTest]), QuestionsModule, FileModule],
  exports: [VideoTestsService, VideoTestsService],
  controllers: [VideoTestsController],
  providers: [VideoTestsService],
})
export class VideoTestsModule {}
