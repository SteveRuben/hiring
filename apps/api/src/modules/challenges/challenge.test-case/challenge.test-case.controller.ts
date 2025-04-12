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
import { CurrentUser } from '@/modules/auth/current-user.decorator';

import { ChallengeTestCaseDto } from '../dto/challenge-test-case.dto';
import { StepBelongsToChallengeGuard } from '../guards/step-belongs-to-challenge.guard';
import { ChallengeTestCaseService } from './challenge.test-case.service';

@Controller('challenges/:challengeId/steps/:stepId/test-case')
@UseGuards(StepBelongsToChallengeGuard)
export class ChallengeTestCaseController {
  constructor(
    private readonly challengeTestCaseService: ChallengeTestCaseService,
  ) {}

  @Post('admin')
  @UseGuards(IsOwnerGuard)
  @IsOwner('Challenge', 'ownerId', 'challengeId')
  create(@Param('stepId') stepId: string, @Body() data: ChallengeTestCaseDto) {
    return this.challengeTestCaseService.create(data, +stepId);
  }

  @Get('admin')
  @UseGuards(IsOwnerGuard)
  @IsOwner('Challenge', 'ownerId', 'challengeId')
  findAll(@Param('stepId') stepId: string) {
    return this.challengeTestCaseService.findAll(+stepId);
  }

  @Get()
  @UseGuards(IsOwnerGuard)
  @IsOwner('Challenge', 'ownerId', 'challengeId')
  userFindAll(
    @CurrentUser() user: { id: string },
    @Param('stepId') stepId: string,
  ): Promise<{ inputData: string }[]> {
    return this.challengeTestCaseService.userFindAll(+user.id, +stepId);
  }

  @Get(':id/admin')
  @UseGuards(IsOwnerGuard)
  @IsOwner('Challenge', 'ownerId', 'challengeId')
  // @UseGuards(TestCaseBelongsToStepGuard)
  findOne(@Param('id') id: string, @Param('stepId') stepId: string) {
    return this.challengeTestCaseService.findOne(+id, +stepId);
  }

  @Patch(':id/admin')
  @UseGuards(IsOwnerGuard)
  @IsOwner('Challenge', 'ownerId', 'challengeId')
  // @UseGuards(TestCaseBelongsToStepGuard)
  update(
    @Param('id/admin') id: string,
    @Param('stepId') stepId: string,
    @Body() updateTestCaseDto: ChallengeTestCaseDto,
  ) {
    return this.challengeTestCaseService.update(
      +id,
      +stepId,
      updateTestCaseDto,
    );
  }

  @Delete(':id/admin')
  @UseGuards(IsOwnerGuard)
  @IsOwner('Challenge', 'ownerId', 'challengeId')
  // @UseGuards(TestCaseBelongsToStepGuard)
  remove(@Param('id') id: string, @Param('stepId') stepId: string) {
    return this.challengeTestCaseService.delete(+id, +stepId);
  }
}
