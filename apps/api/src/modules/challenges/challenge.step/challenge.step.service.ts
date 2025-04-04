import { PrismaService } from '@/prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ChallengeStep } from '@prisma/client';
import {
  CreateChallengeStepDto,
  UpdateChallengeStepDto,
} from '../dto/challenge-step.dto';

@Injectable()
export class ChallengeStepService {
  constructor(private readonly prisma: PrismaService) {}

  async createStep(data: CreateChallengeStepDto): Promise<ChallengeStep> {
    if (!data.challengeId) {
      throw new BadRequestException('Challenge ID is required');
    }

    // Récupérer le nombre d'étapes existantes pour ce challenge
    const existingStepsCount = await this.prisma.challengeStep.count({
      where: { challengeId: data.challengeId },
    });

    return this.prisma.challengeStep.create({
      data: {
        challenge: { connect: { id: data.challengeId } },
        stepNumber: existingStepsCount + 1,
        description: data.description,
      },
    });
  }

  async getStepByChallenge(
    challengeId: number,
    id: number,
  ): Promise<ChallengeStep | null> {
    return this.prisma.challengeStep.findFirst({
      where: {
        id: id,
        challengeId: challengeId, // Vérifie que l'étape appartient bien au challenge
      },
    });
  }

  async getStepsByChallenge(challengeId: number): Promise<ChallengeStep[]> {
    return this.prisma.challengeStep.findMany({
      where: { challengeId },
    });
  }

  async updateStep(
    challengeId: number,
    id: number,
    data: UpdateChallengeStepDto,
  ): Promise<ChallengeStep> {
    // Vérifier si l'étape existe
    const step = await this.prisma.challengeStep.findFirst({
      where: { id, challengeId },
    });

    if (!step) {
      throw new NotFoundException(
        `Step with ID ${id} not found in Challenge ${challengeId}`,
      );
    }

    // Mettre à jour l'étape
    return this.prisma.challengeStep.update({
      where: { id },
      data,
    });
  }

  async deleteStep(challengeId: number, id: number) {
    // Vérifier si l'étape existe
    const step = await this.prisma.challengeStep.findUnique({
      where: { id, challengeId },
    });

    if (!step) {
      throw new NotFoundException(`Step with ID ${id} not found`);
    }

    // Supprimer l'étape
    await this.prisma.challengeStep.delete({ where: { id: id } });

    // Réajuster les `stepNumber` des autres étapes du même challenge
    return await this.prisma.challengeStep.updateMany({
      where: {
        challengeId: step.challengeId, // Même challenge
        stepNumber: { gt: step.stepNumber }, // Étapes après celle supprimée
      },
      data: {
        stepNumber: { decrement: 1 }, // Décrémente de 1
      },
    });
  }
}
