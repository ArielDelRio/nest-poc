import { Injectable } from '@nestjs/common';
import { Attachments, Claims, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttachmentsService {
  constructor(private prisma: PrismaService) {}

  async attachment(
    attachmentWhereUniqueInput: Prisma.AttachmentsWhereUniqueInput,
  ): Promise<Attachments | null> {
    return this.prisma.attachments.findUnique({
      where: attachmentWhereUniqueInput,
    });
  }

  async attachments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AttachmentsWhereUniqueInput;
    where?: Prisma.AttachmentsWhereInput;
    orderBy?: Prisma.AttachmentsOrderByWithRelationInput;
  }): Promise<Attachments[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.attachments.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createAttachment(
    data: Prisma.AttachmentsCreateInput,
  ): Promise<Attachments> {
    return this.prisma.attachments.create({
      data,
    });
  }

  async updateAttachment(params: {
    where: Prisma.AttachmentsWhereUniqueInput;
    data: Prisma.AttachmentsUpdateInput;
  }): Promise<Attachments> {
    const { where, data } = params;
    return this.prisma.attachments.update({
      data,
      where,
    });
  }

  async deleteAttachment(
    where: Prisma.AttachmentsWhereUniqueInput,
  ): Promise<Attachments> {
    return this.prisma.attachments.delete({
      where,
    });
  }

  async getClaim(id: number): Promise<Claims | null> {
    const attachment = await this.prisma.attachments.findUnique({
      where: { id },
      include: {
        Claims: true,
      },
    });
    if (!attachment) {
      return null;
    }
    return attachment.Claims;
  }
}
