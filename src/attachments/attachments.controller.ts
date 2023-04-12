import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { CreateAttachmentsDto } from './dto/create-attachments.dto';
import { UpdateAttachmentsDto } from './dto/update-attachments.dto';
import { AttachmentsPrismaService } from 'src/attachments-prisma/attachments-prisma.service';
import { Attachments, Prisma } from '@prisma/client';

@Controller('attachments')
export class AttachmentsController {
  constructor(
    private readonly attachmentsService: AttachmentsService,
    private readonly attachmentsPrismaService: AttachmentsPrismaService,
  ) {}

  /* -------- TYPE-ORM --------- */
  @Post()
  create(@Body() createAttachmentsDto: CreateAttachmentsDto) {
    return this.attachmentsService.create(createAttachmentsDto);
  }

  @Get()
  findAll() {
    return this.attachmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attachmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttachmentsDto: UpdateAttachmentsDto,
  ) {
    return this.attachmentsService.update(+id, updateAttachmentsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attachmentsService.remove(+id);
  }

  @Get(':id/claim')
  getClaim(@Param('id') id: string) {
    return this.attachmentsService.getClaim(+id);
  }

  /* -------- Prisma --------- */
  @Post('prisma')
  createAttachment(
    @Body() attachmentData: Prisma.AttachmentsCreateInput,
  ): Promise<Attachments> {
    return this.attachmentsPrismaService.createAttachment(attachmentData);
  }

  @Get('prisma')
  attachments(): Promise<Attachments[]> {
    return this.attachmentsPrismaService.attachments({});
  }

  @Get('prisma/:id')
  attachment(@Param('id') id: string): Promise<Attachments | null> {
    return this.attachmentsPrismaService.attachment({
      id: Number(id),
    });
  }

  @Patch('prisma/:id')
  updateAttachment(
    @Param('id') id: string,
    @Body() data: Prisma.AttachmentsUpdateInput,
  ): Promise<Attachments> {
    return this.attachmentsPrismaService.updateAttachment({
      where: { id: Number(id) },
      data,
    });
  }

  @Delete('prisma/:id')
  deleteAttachment(@Param('id') id: string): Promise<Attachments> {
    return this.attachmentsPrismaService.deleteAttachment({
      id: Number(id),
    });
  }

  @Get('prisma/:id/claim')
  async getClaimPrisma(@Param('id') id: string) {
    return this.attachmentsPrismaService.getClaim(Number(id));
  }
}
