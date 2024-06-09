import { Test, TestingModule } from '@nestjs/testing';
import { AssignesService } from './assignes.service';

describe('AssignesService', () => {
  let service: AssignesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignesService],
    }).compile();

    service = module.get<AssignesService>(AssignesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
