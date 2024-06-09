import { Module } from '@nestjs/common';
import { VideoTestsController } from './video-tests.controller';
import { VideoTestsService } from './video-tests.service';

@Module({
  controllers: [VideoTestsController],
  providers: [VideoTestsService],
})
export class VideoTestsModule {}
