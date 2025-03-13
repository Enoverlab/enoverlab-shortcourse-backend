import { Test, TestingModule } from '@nestjs/testing';
import { WebAssessmentController } from './web-assessment.controller';

describe('WebAssessmentController', () => {
  let controller: WebAssessmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebAssessmentController],
    }).compile();

    controller = module.get<WebAssessmentController>(WebAssessmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
