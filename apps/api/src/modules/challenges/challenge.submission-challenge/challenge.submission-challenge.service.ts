import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { prismaError } from '@/utililies/prisma-exception';

import { CreateSubmissionDto } from '../dto/submission-challenge.dto';

@Injectable()
export class SubmissionChallengeService {
  constructor(private readonly prisma: PrismaService) {}

  async createSubmission(
    userId: number,
    challengeId: number,
    stepId: number,
    dto: CreateSubmissionDto,
  ) {
    try {
      const userOutputs = dto.outputUserCode;

      // Vérifie que l'utilisateur participe bien au challenge
      const userChallenge = await this.prisma.userChallenge.findFirst({
        where: {
          userId,
          challengeId,
        },
      });

      if (!userChallenge) {
        throw new Error(
          'Access denied: This user is not participating in this challenge.',
        );
      }

      const userChallengeId = userChallenge.id;

      // Récupérer les test cases du step
      const testCases = await this.prisma.testCaseChallenge.findMany({
        where: { stepId },
        select: {
          inputData: true,
          expectedOutput: true,
        },
      });

      const isCorrect = this.areOutputsCorrect(testCases, userOutputs);

      if (!isCorrect) {
        // Créer une soumission avec result = false
        await this.prisma.submissionChallenge.create({
          data: {
            userChallengeId,
            stepId,
            result: false,
          },
        });

        return {
          success: false,
          message: 'Submission failed: Incorrect output.',
        };
      }

      // Vérifie s'il y a déjà une soumission réussie
      const existingSubmission =
        await this.prisma.submissionChallenge.findUnique({
          where: {
            userChallengeId_stepId: {
              userChallengeId,
              stepId,
            },
          },
        });

      if (existingSubmission) {
        if (existingSubmission.result) {
          return {
            success: false,
            message: 'This step has already been successfully validated.',
          };
        }

        // Met à jour la soumission existante en succès
        await this.prisma.submissionChallenge.update({
          where: {
            userChallengeId_stepId: {
              userChallengeId,
              stepId,
            },
          },
          data: {
            result: true,
          },
        });
      } else {
        // Crée une nouvelle soumission avec result = true
        await this.prisma.submissionChallenge.create({
          data: {
            userChallengeId,
            stepId,
            result: true,
          },
        });
      }

      // Incrémente le currentStep de l'utilisateur
      await this.prisma.userChallenge.update({
        where: { id: userChallengeId },
        data: {
          currentStep: userChallenge.currentStep + 1,
        },
      });

      return {
        success: true,
        message: 'Step validated successfully!',
      };
    } catch (error) {
      prismaError(error, 'submission challenge');
    }
  }

  private areOutputsCorrect(
    expectedCases: { inputData: string; expectedOutput: string }[],
    received: { input: string; output: string }[],
  ): boolean {
    if (expectedCases.length !== received.length) return false;

    for (const testCase of expectedCases) {
      const userResult = received.find((r) => r.input === testCase.inputData);
      if (!userResult || userResult.output !== testCase.expectedOutput) {
        return false;
      }
    }

    return true;
  }
}
