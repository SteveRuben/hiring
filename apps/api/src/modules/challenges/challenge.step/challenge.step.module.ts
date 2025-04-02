import { PrismaService } from '@/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ChallengeStepController } from './challenge.step.controller';
import { ChallengeStepService } from './challenge.step.service';

@Module({
  providers: [ChallengeStepService, PrismaService],
  controllers: [ChallengeStepController],
})
export class ChallengeStepModule {}
