import { Test, TestingModule } from '@nestjs/testing';
import { AssignesController } from './assignes.controller';

describe('AssignesController', () => {
  let controller: AssignesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignesController],
    }).compile();

    controller = module.get<AssignesController>(AssignesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
