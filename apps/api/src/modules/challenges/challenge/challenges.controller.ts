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
import { Public } from '../../auth/public.decorator';
import { ChallengeDto } from '../dto/challenge.dto';
import { ChallengesService } from './challenges.service';

@Public()
@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengeService: ChallengesService) {}

  @Post()
  async create(@Body() data: ChallengeDto): Promise<Challenge> {
    return this.challengeService.createChallenge({
      owner: { connect: { id: data.ownerId } }, // Associer l'owner
      title: data.title,
      description: data.description,
    });
  }

  @Get()
  async findAll(): Promise<Challenge[]> {
    return this.challengeService.getAllChallenges();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Challenge | null> {
    return this.challengeService.getChallengeById(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Omit<Partial<ChallengeDto>, 'ownerId'>,
  ): Promise<Challenge> {
    return this.challengeService.updateChallenge(Number(id), data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Challenge> {
    return this.challengeService.deleteChallenge(Number(id));
  }

  @Patch(':id/publish')
  async publish(@Param('id') id: string): Promise<Challenge> {
    return this.challengeService.deleteChallenge(Number(id));
  }
}
