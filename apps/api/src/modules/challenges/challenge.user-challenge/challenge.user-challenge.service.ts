import { Injectable } from '@nestjs/common';

import { USER_CHALLENGE_STATUS } from '@/modules/challenges/lib/challenge';
import { PrismaService } from '@/prisma/prisma.service';
import { prismaError } from '@/utililies/prisma-exception';

@Injectable()
export class UserChallengeService {
  constructor(private prisma: PrismaService) {}

  async register(challengeId: number, userId: number) {
    try {
      const newUserChallenge = await this.prisma.userChallenge.create({
        data: {
          userId: userId,
          challengeId: challengeId,
        },
      });

      return newUserChallenge;
    } catch (error) {
      prismaError(error, 'user challenge');
    }
  }

  async findUsers(challengeId: number, userId: number) {
    try {
      const usersChallenge = await this.prisma.userChallenge.findMany({
        where: {
          challengeId,
          userId,
        },
        include: {
          user: true,
          Submission: true,
          UserScore: true,
          Leaderboard: true,
        },
      });

      return usersChallenge;
    } catch (error) {
      prismaError(error, 'user challenge');
    }
  }

  async findUser(id: number, challengeId: number) {
    try {
      const userChallenge = await this.prisma.userChallenge.findUnique({
        where: { id, challengeId },
        include: {
          challenge: true,
          user: true,
          Submission: true,
          UserScore: true,
          Leaderboard: true,
        },
      });

      return userChallenge;
    } catch (error) {
      prismaError(error, 'user challenge');
    }
  }

  // async currentUserChallenges(userId: number) {
  //   try {
  //     const deletedUserChallenge = await this.prisma.userChallenge.findMany({
  //       where: {
  //         userId,
  //       },
  //       include: {
  //         challenge: true,
  //         Submission: true,
  //         UserScore: true,
  //         Leaderboard: true,
  //       },
  //     });

  //     return deletedUserChallenge;
  //   } catch (error) {
  //     prismaError(error, 'user challenge');
  //   }
  // }

  async remove(id: number, challengeId: number) {
    try {
      const deletedUserChallenge = await this.prisma.userChallenge.delete({
        where: { id, challengeId },
      });

      return deletedUserChallenge;
    } catch (error) {
      prismaError(error, 'user challenge');
    }
  }

  async abandon(userId: number, challengeId: number) {
    try {
      const abandonedUserChallenge = await this.prisma.userChallenge.update({
        where: {
          userId_challengeId: {
            userId,
            challengeId,
          },
        },
        data: {
          status: USER_CHALLENGE_STATUS.ABANDONED,
        },
      });

      return abandonedUserChallenge;
    } catch (error) {
      prismaError(error, 'user challenge');
    }
  }

  async disqualify(id: number, challengeId: number) {
    try {
      const disqualifiedUserChallenge = await this.prisma.userChallenge.update({
        where: { id, challengeId },
        data: { status: USER_CHALLENGE_STATUS.DISQUALIFIED },
      });

      return disqualifiedUserChallenge;
    } catch (error) {
      prismaError(error, 'user challenge');
    }
  }
}
