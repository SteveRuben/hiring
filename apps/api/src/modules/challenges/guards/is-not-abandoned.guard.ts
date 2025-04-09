import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class IsNotAbandonedGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = +request.user?.id;
    const challengeId = +request.params?.challengeId; // assure-toi que challengeId est bien dans les params

    if (!userId || !challengeId) {
      throw new ForbiddenException('Invalid identifiers.');
    }

    const participation = await this.prisma.userChallenge.findUnique({
      where: {
        userId_challengeId: { userId, challengeId },
      },
      select: {
        status: true,
      },
    });

    if (!participation) {
      throw new ForbiddenException("You haven't joined this challenge.");
    }

    if (participation.status === 'ABANDONED') {
      throw new ForbiddenException(
        'Access denied! You have already abandoned this challenge.',
      );
    }

    return true;
  }
}
