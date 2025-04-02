import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeTestCaseController } from './challenge.test-case.controller';

describe('ChallengeTestCaseController', () => {
  let controller: ChallengeTestCaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengeTestCaseController],
    }).compile();

    controller = module.get<ChallengeTestCaseController>(ChallengeTestCaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
