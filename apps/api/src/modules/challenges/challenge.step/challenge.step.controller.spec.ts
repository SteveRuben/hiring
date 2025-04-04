import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeStepController } from './challenge.step.controller';

describe('ChallengeStepController', () => {
  let controller: ChallengeStepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengeStepController],
    }).compile();

    controller = module.get<ChallengeStepController>(ChallengeStepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
