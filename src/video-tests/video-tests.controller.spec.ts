import { Test, TestingModule } from '@nestjs/testing';
import { VideoTestsController } from './video-tests.controller';

describe('VideoTestsController', () => {
  let controller: VideoTestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoTestsController],
    }).compile();

    controller = module.get<VideoTestsController>(VideoTestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
