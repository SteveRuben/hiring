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

import { ChallengeStepDto } from '../dto/challenge-step.dto';
import { ChallengeStepService } from './challenge.step.service';

@Controller('challenges/:challengeId/steps')
@UseGuards(IsOwnerGuard)
export class ChallengeStepController {
  constructor(private readonly challengeStepService: ChallengeStepService) {}

  @Post('admin')
  @UseGuards(IsOwnerGuard)
  @IsOwner('Challenge', 'ownerId', 'challengeId')
  async create(
    @Param('challengeId') challengeId: string,
    @Body() data: ChallengeStepDto,
  ) {
    return this.challengeStepService.createStep(data, +challengeId);
  }

  @Get(':id/admin')
  @UseGuards(IsOwnerGuard)
  @IsOwner('Challenge', 'ownerId', 'challengeId')
  async getStepByChallenge(
    @Param('challengeId') challengeId: string,
    @Param('id') id: string,
  ) {
    return this.challengeStepService.getStepByChallenge(
      Number(challengeId),
      Number(id),
    );
  }

  @Get(':id')
  async userGetStepByChallenge(
    @CurrentUser() user: { id: string },
    @Param('challengeId') challengeId: string,
    @Param('id') id: string,
  ) {
    return this.challengeStepService.userGetStepByChallenge(
      +id,
      +challengeId,
      +user.id,
    );
  }

  @Get('admin')
  @UseGuards(IsOwnerGuard)
  @IsOwner('Challenge', 'ownerId', 'challengeId')
  async getSteps(@Param('challengeId') challengeId: string) {
    return this.challengeStepService.getStepsByChallenge(Number(challengeId));
  }

  @Get('admin')
  @UseGuards(IsOwnerGuard)
  @IsOwner('Challenge', 'ownerId', 'challengeId')
  async userGetSteps(
    @CurrentUser() user: { id: string },
    @Param('challengeId') challengeId: string,
  ) {
    return this.challengeStepService.userGetStepsByChallenge(
      +challengeId,
      +user.id,
    );
  }

  @Patch(':id/admin')
  @UseGuards(IsOwnerGuard)
  @IsOwner('Challenge', 'ownerId', 'challengeId')
  async update(
    @Param('challengeId') challengeId: string,
    @Param('id') id: string,
    @Body() data: ChallengeStepDto,
  ) {
    return this.challengeStepService.updateStep(
      Number(challengeId),
      Number(id),
      data,
    );
  }

  @Delete(':id/admin')
  @UseGuards(IsOwnerGuard)
  @IsOwner('Challenge', 'ownerId', 'challengeId')
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
