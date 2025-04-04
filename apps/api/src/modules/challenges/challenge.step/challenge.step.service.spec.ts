import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeStepService } from './challenge.step.service';

describe('ChallengeStepService', () => {
  let service: ChallengeStepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChallengeStepService],
    }).compile();

    service = module.get<ChallengeStepService>(ChallengeStepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
