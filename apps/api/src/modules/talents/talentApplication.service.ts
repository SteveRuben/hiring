import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class TalentApplicationService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    firstName: string;
    lastName: string;
    email: string;
    experience: string;
    expertise: string;
    skills: string[];
    bio: string;
    resumeUrl: string;
    resumeSize: number;
    resumeType: string;
  }) {
    const { skills, ...applicationData } = data;

    return this.prisma.talentApplication.create({
      // @ts-ignore
      data: {
        ...applicationData,
        skills: {
          connectOrCreate: skills.map(skillName => ({
            where: { name: skillName },
            create: { name: skillName }
          }))
        }
      },
      include: {
        skills: true
      }
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.TalentApplicationWhereInput;
    orderBy?: Prisma.TalentApplicationOrderByWithRelationInput;
  }) {
    return this.prisma.talentApplication.findMany({
      ...params,
      include: {
        skills: true
      }
    });
  }

  async findOne(id: number) {
    return this.prisma.talentApplication.findUnique({
      where: { id },
      include: {
        skills: true
      }
    });
  }

  async update(id: number, data: Prisma.TalentApplicationUpdateInput) {
    return this.prisma.talentApplication.update({
      where: { id },
      data,
      include: {
        skills: true
      }
    });
  }

  async remove(id: number) {
    return this.prisma.talentApplication.delete({
      where: { id }
    });
  }
}