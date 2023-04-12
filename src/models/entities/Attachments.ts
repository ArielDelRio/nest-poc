import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AreaMedias } from './AreaMedias';
import { Claims } from './Claims';
import { Vouchers } from './Vouchers';

@Index('Attachments_pkey_index', ['id'], { unique: true })
@Entity('Attachments', { schema: 'public' })
export class Attachments {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'title', length: 255 })
  title: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('character varying', { name: 'filename', length: 255 })
  filename: string;

  @Column('enum', {
    name: 'status',
    enum: [
      'INGESTED',
      'PROCESSED',
      'TRANSCODED',
      'PUBLISHED',
      'ERROR',
      'UPLOADED',
      'NEW',
    ],
  })
  status:
    | 'INGESTED'
    | 'PROCESSED'
    | 'TRANSCODED'
    | 'PUBLISHED'
    | 'ERROR'
    | 'UPLOADED'
    | 'NEW';

  @Column('enum', {
    name: 'attachment_type',
    enum: ['DOC', 'IMAGE', 'VIDEO', 'AUDIO', 'OTHER'],
  })
  attachmentType: 'DOC' | 'IMAGE' | 'VIDEO' | 'AUDIO' | 'OTHER';

  @Column('character varying', { name: 'url', nullable: true, length: 255 })
  url: string | null;

  @Column('character varying', {
    name: 'thumbnail',
    nullable: true,
    length: 255,
  })
  thumbnail: string | null;

  @Column('character varying', {
    name: 'build_guid',
    nullable: true,
    length: 255,
  })
  buildGuid: string | null;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('integer', { name: 'area_id', nullable: true })
  areaId: number | null;

  @OneToMany(() => AreaMedias, (areaMedias) => areaMedias.attachment)
  areaMedias: AreaMedias[];

  @ManyToOne(() => Claims, (claims) => claims.attachments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'claim_id', referencedColumnName: 'id' }])
  claim: Claims;

  @ManyToOne(() => Vouchers, (vouchers) => vouchers.attachments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'voucher_id', referencedColumnName: 'id' }])
  voucher: Vouchers;
}
