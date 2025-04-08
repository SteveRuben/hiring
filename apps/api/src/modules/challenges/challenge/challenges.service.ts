import { Injectable } from '@nestjs/common';
import { Challenge, Prisma } from '@prisma/client';

import { STATUS_CHALLENGE } from '@/lib/challenge';
import { PrismaService } from '@/prisma/prisma.service';
import { prismaError } from '@/utililies/prisma-exception';

@Injectable()
export class ChallengesService {
  constructor(private readonly prisma: PrismaService) {}

  async createChallenge(data: Prisma.ChallengeCreateInput): Promise<Challenge> {
    try {
      const newChallenge = await this.prisma.challenge.create({ data });
      return newChallenge;
    } catch (error) {
      prismaError(error, 'challenge');
    }
  }

  async getAllChallenges(ownerId: number): Promise<Challenge[]> {
    try {
      const getAllChallenges = await this.prisma.challenge.findMany({
        where: { ownerId: ownerId },
      });
      return getAllChallenges;
    } catch (error) {
      prismaError(error, 'challenge');
    }
  }

  async getChallengeById(
    id: number,
    ownerId: number,
  ): Promise<Challenge | null> {
    try {
      const getChallenge = await this.prisma.challenge.findUnique({
        where: { id, ownerId },
      });
      return getChallenge;
    } catch (error) {
      prismaError(error, 'challenge');
    }
  }

  async updateChallenge(
    id: number,
    ownerId: number,
    data: Prisma.ChallengeUpdateInput,
  ): Promise<Challenge> {
    try {
      const updatedChallenge = await this.prisma.challenge.update({
        where: { id, ownerId },
        data,
      });
      return updatedChallenge;
    } catch (error) {
      prismaError(error, 'challenge');
    }
  }

  async deleteChallenge(id: number, ownerId: number): Promise<Challenge> {
    try {
      const deletedChallenge = await this.prisma.challenge.delete({
        where: { id, ownerId },
      });
      return deletedChallenge;
    } catch (error) {
      prismaError(error, 'challenge');
    }
  }

  async publish(id: number, ownerId: number): Promise<Challenge> {
    try {
      const publishedChallenge = await this.prisma.challenge.update({
        where: { id, ownerId },
        data: { status: STATUS_CHALLENGE.PUBLISHED },
      });
      return publishedChallenge;
    } catch (error) {
      prismaError(error, 'challenge');
    }
  }
}
