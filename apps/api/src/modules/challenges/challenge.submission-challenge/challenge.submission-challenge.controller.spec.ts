import { Test, TestingModule } from '@nestjs/testing';

import { ChallengeSubmissionChallengeController } from './challenge.submission-challenge.controller';

describe('ChallengeSubmissionChallengeController', () => {
  let controller: ChallengeSubmissionChallengeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengeSubmissionChallengeController],
    }).compile();

    controller = module.get<ChallengeSubmissionChallengeController>(
      ChallengeSubmissionChallengeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
