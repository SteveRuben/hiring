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
import { GetChallengeByUser } from '../types/challenges';
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

  @Get('admin')
  async findAll(@CurrentUser() user: { id: string }): Promise<Challenge[]> {
    return this.challengeService.getAllChallenges(+user.id);
  }

  @Get()
  async userFindAll(
    @CurrentUser() user: { id: string },
  ): Promise<GetChallengeByUser[]> {
    return this.challengeService.userGetAllChallenges(+user.id);
  }

  @Get(':id/admin')
  async findOne(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
  ): Promise<Challenge | null> {
    return this.challengeService.getChallengeById(+id, +user.id);
  }

  @Get(':id')
  async userFindOne(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
  ): Promise<GetChallengeByUser | null> {
    return this.challengeService.userGetChallengeById(+id, +user.id);
  }

  @Patch(':id/admin')
  async update(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() data: Partial<ChallengeDto>,
  ): Promise<Challenge> {
    return this.challengeService.updateChallenge(+id, +user.id, data);
  }

  @Delete(':id/admin')
  async remove(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
  ): Promise<Challenge> {
    return this.challengeService.deleteChallenge(+id, +user.id);
  }

  @Patch(':id/publish/admin')
  async publish(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
  ): Promise<Challenge> {
    return this.challengeService.publish(+id, +user.id);
  }

  @Patch(':id/archive/admin')
  async archive(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
  ): Promise<Challenge> {
    return this.challengeService.archive(+id, +user.id);
  }
}
