import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma/prisma.module';

import { SubmissionChallengeController } from './challenge.submission-challenge.controller';
import { SubmissionChallengeService } from './challenge.submission-challenge.service';

@Module({
  imports: [PrismaModule],
  controllers: [SubmissionChallengeController],
  providers: [SubmissionChallengeService],
})
export class SubmissionChallengeModule {}
