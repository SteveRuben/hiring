import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; email: string; message: string }) {
    const { name, email, message, ...contactData } = data;

    const created = await this.prisma.contact.create({
      data: {
        ...contactData,
        name,
        email,
        message,
      },
    });
    return created;
  }

  async liste() {
    return this.prisma.contact.findMany();
  }

  async filterById(id) {}
  //   async findAll(params: {
  //     skip?: number;
  //     take?: number;
  //     where?: Prisma.TalentApplicationWhereInput;
  //     orderBy?: Prisma.TalentApplicationOrderByWithRelationInput;
  //   }) {
  //     return this.prisma.talentApplication.findMany({
  //       ...params,
  //       include: {
  //         skills: true,
  //       },
  //     });
  //   }

  //   async findOne(id: number) {
  //     return this.prisma.talentApplication.findUnique({
  //       where: { id },
  //       include: {
  //         skills: true,
  //       },
  //     });
  //   }

  //   async update(id: number, data: Prisma.TalentApplicationUpdateInput) {
  //     return this.prisma.talentApplication.update({
  //       where: { id },
  //       data,
  //       include: {
  //         skills: true,
  //       },
  //     });
  //   }

  //   async remove(id: number) {
  //     return this.prisma.talentApplication.delete({
  //       where: { id },
  //     });
  //   }
}
