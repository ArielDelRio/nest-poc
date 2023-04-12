import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachments } from 'src/models/entities/Attachments';
import { AttachmentsPrismaService } from 'src/attachments-prisma/attachments-prisma.service';

@Module({
  imports: [TypeOrmModule.forFeature([Attachments])],
  controllers: [AttachmentsController],
  providers: [AttachmentsService, AttachmentsPrismaService],
})
export class AttachmentsModule {}
