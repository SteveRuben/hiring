import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class IsNotDisqualifiedGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const id = +request.params?.id;
    const challengeId = +request.params?.challengeId;

    if (!id || !challengeId) {
      throw new ForbiddenException('Invalid userChallenge identifiers.');
    }

    const userChallenge = await this.prisma.userChallenge.findFirst({
      where: {
        id,
        challengeId,
      },
      select: {
        status: true,
      },
    });

    if (!userChallenge) {
      throw new ForbiddenException(
        'User participation not found for this challenge.',
      );
    }

    if (userChallenge.status === 'DISQUALIFIED') {
      throw new ForbiddenException(
        'Access denied! User is already disqualified.',
      );
    }

    return true;
  }
}
