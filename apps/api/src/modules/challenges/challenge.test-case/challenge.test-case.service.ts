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
