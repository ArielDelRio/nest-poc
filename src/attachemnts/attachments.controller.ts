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

@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

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
}
