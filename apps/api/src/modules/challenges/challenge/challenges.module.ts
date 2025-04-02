import { PrismaService } from '@/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';

@Module({
  providers: [ChallengesService, PrismaService],
  controllers: [ChallengesController],
})
export class ChallengesModule {}
