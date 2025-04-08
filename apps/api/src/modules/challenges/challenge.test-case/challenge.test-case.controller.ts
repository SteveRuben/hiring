import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { IsOwner } from '@/common/decorators/is-owner.decorator';
import { IsOwnerGuard } from '@/common/guards/is-owner.guard';

import { ChallengeTestCaseDto } from '../dto/challenge-test-case.dto';
import { StepBelongsToChallengeGuard } from '../guards/step-belongs-to-challenge.guard';
import { ChallengeTestCaseService } from './challenge.test-case.service';

@UseGuards(IsOwnerGuard)
@IsOwner('Challenge', 'ownerId', 'challengeId')
@Controller('challenges/:challengeId/steps/:stepId/test-case')
@UseGuards(StepBelongsToChallengeGuard)
export class ChallengeTestCaseController {
  constructor(
    private readonly challengeTestCaseService: ChallengeTestCaseService,
  ) {}

  @Post()
  create(@Param('stepId') stepId: string, @Body() data: ChallengeTestCaseDto) {
    return this.challengeTestCaseService.create(data, +stepId);
  }

  @Get()
  findAll(@Param('stepId') stepId: string) {
    return this.challengeTestCaseService.findAll(+stepId);
  }

  @Get(':id')
  // @UseGuards(TestCaseBelongsToStepGuard)
  findOne(@Param('id') id: string, @Param('stepId') stepId: string) {
    return this.challengeTestCaseService.findOne(+id, +stepId);
  }

  @Patch(':id')
  // @UseGuards(TestCaseBelongsToStepGuard)
  update(
    @Param('id') id: string,
    @Param('stepId') stepId: string,
    @Body() updateTestCaseDto: ChallengeTestCaseDto,
  ) {
    return this.challengeTestCaseService.update(
      +id,
      +stepId,
      updateTestCaseDto,
    );
  }

  @Delete(':id')
  // @UseGuards(TestCaseBelongsToStepGuard)
  remove(@Param('id') id: string, @Param('stepId') stepId: string) {
    return this.challengeTestCaseService.delete(+id, +stepId);
  }
}
