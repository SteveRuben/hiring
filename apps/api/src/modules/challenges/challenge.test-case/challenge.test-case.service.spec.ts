import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeTestCaseService } from './challenge.test-case.service';

describe('ChallengeTestCaseService', () => {
  let service: ChallengeTestCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChallengeTestCaseService],
    }).compile();

    service = module.get<ChallengeTestCaseService>(ChallengeTestCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
