import { Public } from '@/modules/auth/public.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateChallengeStepDto,
  UpdateChallengeStepDto,
} from '../dto/challenge-step.dto';
import { ChallengeStepService } from './challenge.step.service';

@Public()
@Controller('challenges/:challengeId/steps')
export class ChallengeStepController {
  constructor(private readonly challengeStepService: ChallengeStepService) {}

  @Post()
  async create(
    @Param('challengeId') challengeId: string,
    @Body() data: Omit<CreateChallengeStepDto, 'challengeId'>,
  ) {
    return this.challengeStepService.createStep({
      ...data,
      challengeId: Number(challengeId),
    });
  }

  @Get(':id')
  async getStepByChallenge(
    @Param('challengeId') challengeId: string,
    @Param('id') id: string,
  ) {
    return this.challengeStepService.getStepByChallenge(
      Number(challengeId),
      Number(id),
    );
  }

  @Get()
  async getSteps(@Param('challengeId') challengeId: string) {
    return this.challengeStepService.getStepsByChallenge(Number(challengeId));
  }

  @Patch(':id')
  async update(
    @Param('challengeId') challengeId: string,
    @Param('id') id: string,
    @Body() data: UpdateChallengeStepDto,
  ) {
    return this.challengeStepService.updateStep(
      Number(challengeId),
      Number(id),
      data,
    );
  }

  @Delete(':id')
  async delete(
    @Param('challengeId') challengeId: string,
    @Param('id') id: string,
  ) {
    return this.challengeStepService.deleteStep(
      Number(challengeId),
      Number(id),
    );
  }
}
