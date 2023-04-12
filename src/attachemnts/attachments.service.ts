import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttachmentsDto } from './dto/create-attachments.dto';
import { UpdateAttachmentsDto } from './dto/update-attachments.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attachments } from 'src/models/entities/Attachments';
import { Repository } from 'typeorm';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(Attachments)
    private attachmentsRepository: Repository<Attachments>,
  ) {}

  async create(createAttachmentsDto: CreateAttachmentsDto) {
    const attachments = await this.attachmentsRepository.create(
      createAttachmentsDto,
    );
    return this.attachmentsRepository.save(attachments);
  }

  findAll() {
    return this.attachmentsRepository.find();
  }

  async findOne(id: number) {
    const attachment = await this.attachmentsRepository.findOne({
      where: {
        id,
      },
    });
    if (!attachment) {
      throw new NotFoundException(`Attachment #${id} not found`);
    }
    return attachment;
  }

  async update(id: number, updateAttachmentsDto: UpdateAttachmentsDto) {
    const attachment = await this.attachmentsRepository.preload({
      id,
      ...updateAttachmentsDto,
    });
    if (!attachment) {
      throw new NotFoundException(`Attachment #${id} not found`);
    }
    return attachment;
  }

  async remove(id: number) {
    const attachment = await this.findOne(id);
    return this.attachmentsRepository.remove(attachment);
  }

  async getClaim(id: number) {
    const attachments = await this.attachmentsRepository.findOne({
      where: {
        id,
      },
      relations: ['claim'],
    });
    if (!attachments) {
      throw new NotFoundException(`Attachment #${id} not found`);
    }
    return attachments.claim;
  }
}
