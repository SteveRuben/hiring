import { Public } from '@/modules/auth/public.decorator';
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
import {
  CreateChallengeTestCaseDto,
  UpdateChallengeTestCaseDto,
} from '../dto/challenge-test-case.dto';
import { StepBelongsToChallengeGuard } from '../guards/step-belongs-to-challenge.guard';
import { TestCaseBelongsToStepGuard } from '../guards/test-case-belongs-to-step.guard';
import { ChallengeTestCaseService } from './challenge.test-case.service';

@Public()
@Controller('challenges/:challengeId/steps/:stepId/test-case')
@UseGuards(StepBelongsToChallengeGuard)
export class ChallengeTestCaseController {
  constructor(
    private readonly challengeTestCaseService: ChallengeTestCaseService,
  ) {}

  @Post()
  create(
    @Param('stepId') stepId: string,
    @Body() data: Omit<CreateChallengeTestCaseDto, 'stepId'>,
  ) {
    return this.challengeTestCaseService.create({
      ...data,
      stepId: Number(stepId),
    });
  }

  @Get()
  findAll(@Param('stepId') stepId: string) {
    return this.challengeTestCaseService.findAll(Number(stepId));
  }

  @Get(':id')
  @UseGuards(TestCaseBelongsToStepGuard)
  findOne(@Param('id') id: string, @Param('stepId') stepId: string) {
    return this.challengeTestCaseService.findOne(+id, +stepId);
  }

  @Patch(':id')
  @UseGuards(TestCaseBelongsToStepGuard)
  update(
    @Param('id') id: string,
    @Param('stepId') stepId: string,
    @Body() updateTestCaseDto: UpdateChallengeTestCaseDto,
  ) {
    return this.challengeTestCaseService.update(
      +id,
      +stepId,
      updateTestCaseDto,
    );
  }

  @Delete(':id')
  @UseGuards(TestCaseBelongsToStepGuard)
  remove(@Param('id') id: string, @Param('stepId') stepId: string) {
    return this.challengeTestCaseService.remove(+id, +stepId);
  }
}
