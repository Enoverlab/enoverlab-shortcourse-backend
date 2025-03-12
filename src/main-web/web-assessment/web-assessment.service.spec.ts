import { Test, TestingModule } from '@nestjs/testing';
import { WebAssessmentService } from './web-assessment.service';

describe('WebAssessmentService', () => {
  let service: WebAssessmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebAssessmentService],
    }).compile();

    service = module.get<WebAssessmentService>(WebAssessmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
