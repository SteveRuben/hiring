import { Injectable } from '@nestjs/common';
import { ChallengeStep } from '@prisma/client';

import { PrismaService } from '@/prisma/prisma.service';
import { prismaError } from '@/utililies/prisma-exception';

import { ChallengeStepDto } from '../dto/challenge-step.dto';

@Injectable()
export class ChallengeStepService {
  constructor(private readonly prisma: PrismaService) {}

  async createStep(
    data: ChallengeStepDto,
    challengeId: number,
  ): Promise<ChallengeStep> {
    try {
      const existingStepsCount = await this.prisma.challengeStep.count({
        where: { challengeId: challengeId },
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
