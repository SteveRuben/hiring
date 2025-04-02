import { PrismaService } from '@/prisma/prisma.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class StepBelongsToChallengeGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { challengeId, stepId } = request.params;

    if (!challengeId || !stepId) {
      throw new NotFoundException('Challenge ID ou Step ID manquant.');
    }

    const step = await this.prisma.challengeStep.findUnique({
      where: { id: Number(stepId) },
      include: { challenge: true },
    });

    if (!step || step.challengeId !== Number(challengeId)) {
      throw new NotFoundException(
        "L'étape demandée n'appartient pas au challenge.",
      );
    }

    return true; // Autorise la requête
  }
}
