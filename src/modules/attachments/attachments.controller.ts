import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Attachments, Prisma } from '@prisma/client';
import { AttachmentsService } from './attachments.service';

@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post()
  createAttachment(
    @Body() attachmentData: Prisma.AttachmentsCreateInput,
  ): Promise<Attachments> {
    return this.attachmentsService.createAttachment(attachmentData);
  }

  @Get()
  attachments(): Promise<Attachments[]> {
    return this.attachmentsService.attachments({});
  }

  @Get('/:id')
  attachment(@Param('id') id: string): Promise<Attachments | null> {
    return this.attachmentsService.attachment({
      id: Number(id),
    });
  }

  @Patch('/:id')
  updateAttachment(
    @Param('id') id: string,
    @Body() data: Prisma.AttachmentsUpdateInput,
  ): Promise<Attachments> {
    return this.attachmentsService.updateAttachment({
      where: { id: Number(id) },
      data,
    });
  }

  @Delete('/:id')
  deleteAttachment(@Param('id') id: string): Promise<Attachments> {
    return this.attachmentsService.deleteAttachment({
      id: Number(id),
    });
  }

  @Get('/:id/claim')
  async getClaimPrisma(@Param('id') id: string) {
    return this.attachmentsService.getClaim(Number(id));
  }
}
