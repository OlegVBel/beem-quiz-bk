import { Test, TestingModule } from '@nestjs/testing';
import { VideoTestsService } from './video-tests.service';

describe('VideoTestsService', () => {
  let service: VideoTestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoTestsService],
    }).compile();

    service = module.get<VideoTestsService>(VideoTestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
