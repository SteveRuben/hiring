import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma/prisma.module';

import { UserChallengeController } from './challenge.user-challenge.controller';
import { UserChallengeService } from './challenge.user-challenge.service';

@Module({
  imports: [PrismaModule],
  providers: [UserChallengeService],
  controllers: [UserChallengeController],
})
export class UserChallengeModule {}
