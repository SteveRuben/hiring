import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Challenge } from '@prisma/client';

import { CurrentUser } from '@/modules/auth/current-user.decorator';

import { ChallengeDto } from '../dto/challenge.dto';
import { ChallengesService } from './challenges.service';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengeService: ChallengesService) {}

  @Post()
  async create(
    @CurrentUser() user: { id: string },
    @Body() data: ChallengeDto,
  ): Promise<Challenge> {
    return this.challengeService.createChallenge({
      owner: { connect: { id: +user.id } }, // Associer l'owner
      title: data.title,
      description: data.description,
    });
  }

  @Get()
  async findAll(@CurrentUser() user: { id: string }): Promise<Challenge[]> {
    return this.challengeService.getAllChallenges(+user.id);
  }

  @Get(':id')
  async findOne(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
  ): Promise<Challenge | null> {
    return this.challengeService.getChallengeById(+id, +user.id);
  }

  @Patch(':id')
  async update(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() data: Partial<ChallengeDto>,
  ): Promise<Challenge> {
    return this.challengeService.updateChallenge(+id, +user.id, data);
  }

  @Delete(':id')
  async remove(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
  ): Promise<Challenge> {
    return this.challengeService.deleteChallenge(+id, +user.id);
  }

  @Patch(':id/publish')
  // @UseGuards(IsOwnerGuard)
  // @IsOwner('Challenge', 'ownerId')
  async publish(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
  ): Promise<Challenge> {
    return this.challengeService.publish(+id, +user.id);
  }
}
