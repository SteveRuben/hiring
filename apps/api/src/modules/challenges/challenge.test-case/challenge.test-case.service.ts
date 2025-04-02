import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  CreateChallengeTestCaseDto,
  UpdateChallengeTestCaseDto,
} from '../dto/challenge-test-case.dto';

@Injectable()
export class ChallengeTestCaseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateChallengeTestCaseDto) {
    return this.prisma.testCaseChallenge.create({ data });
  }

  async findAll(stepId: number) {
    return this.prisma.testCaseChallenge.findMany({ where: { stepId } });
  }

  async findOne(id: number, stepId: number) {
    return this.prisma.testCaseChallenge.findUnique({ where: { id, stepId } });
  }

  async update(id: number, stepId: number, data: UpdateChallengeTestCaseDto) {
    return this.prisma.testCaseChallenge.update({
      where: { id, stepId },
      data,
    });
  }

  async remove(id: number, stepId: number) {
    return this.prisma.testCaseChallenge.delete({ where: { id, stepId } });
  }
}
