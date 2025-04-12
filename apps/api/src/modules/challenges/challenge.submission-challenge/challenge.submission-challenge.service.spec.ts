import { Test, TestingModule } from '@nestjs/testing';

import { ChallengeSubmissionChallengeService } from './challenge.submission-challenge.service';

describe('ChallengeSubmissionChallengeService', () => {
  let service: ChallengeSubmissionChallengeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChallengeSubmissionChallengeService],
    }).compile();

    service = module.get<ChallengeSubmissionChallengeService>(
      ChallengeSubmissionChallengeService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
