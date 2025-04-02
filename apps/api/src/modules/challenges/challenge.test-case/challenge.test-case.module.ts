import { PrismaService } from '@/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ChallengeTestCaseController } from './challenge.test-case.controller';
import { ChallengeTestCaseService } from './challenge.test-case.service';

@Module({
  controllers: [ChallengeTestCaseController],
  providers: [ChallengeTestCaseService, PrismaService],
  exports: [ChallengeTestCaseService],
})
export class ChallengeTestCaseModule {}
