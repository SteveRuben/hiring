import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

export const UserChallengeId = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext): Promise<number> => {
    const request = ctx.switchToHttp().getRequest();
    const prisma: PrismaService = request.prisma; // injecté depuis middleware ou autre solution
    const userId = +request.user?.id;
    const challengeId = +request.params.challengeId;

    const participation = await prisma.userChallenge.findUnique({
      where: {
        userId_challengeId: {
          userId,
          challengeId,
        },
      },
    });

    if (!participation) {
      throw new ForbiddenException('Vous ne participez pas à ce challenge.');
    }

    return participation.id;
  },
);
