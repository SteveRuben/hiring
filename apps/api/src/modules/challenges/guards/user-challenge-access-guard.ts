import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UserChallengeAccessGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const { challengeId } = request.params;
    const userId = +user.id;

    // Vérifier si le challenge existe et si l'utilisateur est le créateur
    const challenge = await this.prisma.challenge.findUnique({
      where: { id: +challengeId },
      select: { ownerId: true },
    });

    if (!challenge) {
      throw new ForbiddenException('Le challenge n’existe pas');
    }

    if (challenge.ownerId === userId) {
      throw new ForbiddenException(
        'Vous ne pouvez pas participer à votre propre challenge',
      );
    }

    // Vérifier si l'utilisateur a déjà rejoint ce challenge
    const existingParticipation = await this.prisma.userChallenge.findUnique({
      where: {
        userId_challengeId: {
          userId,
          challengeId: +challengeId,
        },
      },
    });

    if (existingParticipation) {
      throw new ForbiddenException('Vous avez déjà rejoint ce challenge');
    }

    return true;
  }
}
