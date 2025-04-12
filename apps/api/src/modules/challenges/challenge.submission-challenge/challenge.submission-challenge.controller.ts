import { Body, Controller, Param, Post } from '@nestjs/common';

import { CurrentUser } from '@/modules/auth/current-user.decorator';

import { CreateSubmissionDto } from '../dto/submission-challenge.dto';
import { SubmissionChallengeService } from './challenge.submission-challenge.service';

@Controller('challenge/:challengeId/submission-challenge/:stepId')
export class SubmissionChallengeController {
  constructor(private readonly submissionService: SubmissionChallengeService) {}

  @Post()
  async submitChallenge(
    @CurrentUser() user: { id: string },
    @Param('challengeId') challengeId: number,
    @Param('stepId') stepId: number,
    @Body() dto: CreateSubmissionDto,
  ) {
    return this.submissionService.createSubmission(
      +user.id,
      challengeId,
      stepId,
      dto,
    );
  }
}
