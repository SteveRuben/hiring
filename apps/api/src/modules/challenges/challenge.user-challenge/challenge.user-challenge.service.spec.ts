import { Test, TestingModule } from '@nestjs/testing';

import { UserChallengeService } from './challenge.user-challenge.service';

describe('UserChallengeService', () => {
  let service: UserChallengeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserChallengeService],
    }).compile();

    service = module.get<UserChallengeService>(UserChallengeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
