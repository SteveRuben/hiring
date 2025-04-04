import { STATUS_CHALLENGE } from '@/lib/challenge';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Challenge, Prisma } from '@prisma/client';

@Injectable()
export class ChallengesService {
  constructor(private readonly prisma: PrismaService) {}

  async createChallenge(data: Prisma.ChallengeCreateInput): Promise<Challenge> {
    return this.prisma.challenge.create({ data });
  }

  async getAllChallenges(): Promise<Challenge[]> {
    return this.prisma.challenge.findMany();
  }

  async getChallengeById(id: number): Promise<Challenge | null> {
    return this.prisma.challenge.findUnique({ where: { id } });
  }

  async updateChallenge(
    id: number,
    data: Prisma.ChallengeUpdateInput,
  ): Promise<Challenge> {
    return this.prisma.challenge.update({ where: { id }, data });
  }

  async deleteChallenge(id: number): Promise<Challenge> {
    return this.prisma.challenge.delete({ where: { id } });
  }

  async publish(id: number): Promise<Challenge> {
    return this.prisma.challenge.update({
      where: { id },
      data: { status: STATUS_CHALLENGE.PUBLISHED },
    });
  }
}
