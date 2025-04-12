import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { prismaError } from '@/utililies/prisma-exception';

import { ChallengeTestCaseDto } from '../dto/challenge-test-case.dto';

@Injectable()
export class ChallengeTestCaseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ChallengeTestCaseDto, stepId: number) {
    try {
      const newTestCaseChallenge = await this.prisma.testCaseChallenge.create({
        data: { ...data, stepId },
      });
      return newTestCaseChallenge;
    } catch (error) {
      prismaError(error, 'challenge test case');
    }
  }

  async findAll(stepId: number) {
    try {
      const getTestCaseChallenges =
        await this.prisma.testCaseChallenge.findMany({ where: { stepId } });
      return getTestCaseChallenges;
    } catch (error) {
      prismaError(error, 'challenge test case');
    }
  }

  async userFindAll(
    userId: number,
    stepId: number,
  ): Promise<{ inputData: string }[]> {
    try {
      // Vérifie si ce step appartient bien à un challenge auquel le user participe
      const step = await this.prisma.challengeStep.findUnique({
        where: { id: stepId },
        include: {
          challenge: {
            include: {
              userChallenge: {
                where: { userId },
              },
            },
          },
        },
      });

      if (!step || !step.challenge.userChallenge.length) {
        throw new Error(
          'Access denied: You do not participate in the challenge associated with this step.',
        );
      }

      // Récupère les inputs
      const testCaseInputs = await this.prisma.testCaseChallenge.findMany({
        where: { stepId },
        select: { inputData: true },
      });

      return testCaseInputs;
    } catch (error) {
      prismaError(error, 'challenge test case');
    }
  }

  async findOne(id: number, stepId: number) {
    try {
      const getTestCaseChallenge =
        await this.prisma.testCaseChallenge.findUnique({
          where: { id, stepId },
        });
      return getTestCaseChallenge;
    } catch (error) {
      prismaError(error, 'challenge test case');
    }
  }

  async update(id: number, stepId: number, data: ChallengeTestCaseDto) {
    try {
      const updatedTestCaseChallenge =
        await this.prisma.testCaseChallenge.update({
          where: { id, stepId },
          data,
        });
      return updatedTestCaseChallenge;
    } catch (error) {
      prismaError(error, 'challenge test case');
    }
  }

  async delete(id: number, stepId: number) {
    try {
      const deletedTestCaseChallenge =
        await this.prisma.testCaseChallenge.delete({ where: { id, stepId } });
      return deletedTestCaseChallenge;
    } catch (error) {
      prismaError(error, 'challenge test case');
    }
  }
}
