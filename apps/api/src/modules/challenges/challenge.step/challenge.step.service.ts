import { Injectable } from '@nestjs/common';
import { ChallengeStep } from '@prisma/client';

import { PrismaService } from '@/prisma/prisma.service';
import { prismaError } from '@/utililies/prisma-exception';

import { ChallengeStepDto } from '../dto/challenge-step.dto';
import { USER_CHALLENGE_STATUS } from '../lib/challenge';

@Injectable()
export class ChallengeStepService {
  constructor(private readonly prisma: PrismaService) {}

  async createStep(
    data: ChallengeStepDto,
    challengeId: number,
  ): Promise<ChallengeStep> {
    try {
      const existingStepsCount = await this.prisma.challengeStep.count({
        where: { challengeId },
      });

      const newChallengeStep = await this.prisma.challengeStep.create({
        data: {
          challenge: { connect: { id: challengeId } },
          stepNumber: existingStepsCount + 1,
          description: data.description,
        },
      });
      return newChallengeStep;
    } catch (error) {
      prismaError(error, 'challenge step');
    }
  }

  async getStepByChallenge(
    challengeId: number,
    id: number,
  ): Promise<ChallengeStep | null> {
    try {
      const getChallengeStep = await this.prisma.challengeStep.findUnique({
        where: { id, challengeId },
      });
      return getChallengeStep;
    } catch (error) {
      prismaError(error, 'challenge step');
    }
  }

  async userGetStepByChallenge(
    id: number,
    challengeId: number,
    userId: number,
  ): Promise<ChallengeStep | null> {
    try {
      const userChallenge = await this.prisma.userChallenge.findFirst({
        where: {
          userId,
          challengeId,
        },
      });

      if (!userChallenge) {
        throw new Error(
          'Access denied : This user has not subscribe at this challenge.',
        );
      }

      // Récupère l'étape uniquement si elle est <= currentStep
      const step = await this.prisma.challengeStep.findFirst({
        where: {
          id,
          challengeId,
        },
      });

      if (!step) {
        throw new Error('This step is not found on this challenge');
      }

      // Vérifie si l'utilisateur peut accéder à cette étape
      if (step.stepNumber > userChallenge.currentStep) {
        throw new Error(
          "Accès refusé : cette étape n'est pas encore débloquée.",
        );
      }

      // Si c'est le tout premier accès à l'étape 1
      if (userChallenge.currentStep === 0 && step.stepNumber === 1) {
        await this.prisma.userChallenge.update({
          where: { id: userChallenge.id, challengeId },
          data: {
            currentStep: 1,
            status: USER_CHALLENGE_STATUS.IN_PROGRESS,
          },
        });
      }

      return step;
    } catch (error) {
      prismaError(error, 'challenge step');
    }
  }

  async getStepsByChallenge(challengeId: number): Promise<ChallengeStep[]> {
    try {
      const getChallengeSteps = await this.prisma.challengeStep.findMany({
        where: { challengeId },
      });
      return getChallengeSteps;
    } catch (error) {
      prismaError(error, 'challenge step');
    }
  }

  async userGetStepsByChallenge(
    challengeId: number,
    userId: number,
  ): Promise<ChallengeStep[]> {
    try {
      const userChallenge = await this.prisma.userChallenge.findFirst({
        where: {
          userId,
          challengeId,
        },
      });

      if (!userChallenge) {
        throw new Error(
          'Access denied : This user has not subscribed to this challenge.',
        );
      }

      // Récupère toutes les étapes débloquées pour cet utilisateur
      const steps = await this.prisma.challengeStep.findMany({
        where: {
          challengeId,
          stepNumber: {
            lte: userChallenge.currentStep, // <= currentStep
          },
        },
        orderBy: {
          stepNumber: 'asc', // Pour les récupérer dans l’ordre logique
        },
      });

      return steps;
    } catch (error) {
      prismaError(error, 'challenge step');
    }
  }

  async updateStep(
    challengeId: number,
    id: number,
    data: ChallengeStepDto,
  ): Promise<ChallengeStep> {
    try {
      const updatedChallengeStep = await this.prisma.challengeStep.update({
        where: { id, challengeId },
        data,
      });

      return updatedChallengeStep;
    } catch (error) {
      prismaError(error, 'challenge step');
    }
  }

  async deleteStep(challengeId: number, id: number) {
    try {
      const deletedChallengeStep = await this.prisma.challengeStep.delete({
        where: { id, challengeId },
      });

      // Réajuster les `stepNumber` des autres étapes du même challenge
      const undeletedChallengeSteps =
        await this.prisma.challengeStep.updateMany({
          where: {
            challengeId: deletedChallengeStep.challengeId, // Même challenge
            stepNumber: { gt: deletedChallengeStep.stepNumber }, // Étapes après celle supprimée
          },
          data: {
            stepNumber: { decrement: 1 }, // Décrémente de 1
          },
        });

      return undeletedChallengeSteps;
    } catch (error) {
      prismaError(error, 'challenge step');
    }
  }
}
