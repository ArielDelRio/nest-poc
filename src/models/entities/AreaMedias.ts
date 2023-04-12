import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Areas } from './Areas';
import { Attachments } from './Attachments';

@Index('AreaMedias_pkey_index', ['areaId', 'attachmentId'], { unique: true })
@Entity('AreaMedias', { schema: 'public' })
export class AreaMedias {
  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('integer', { primary: true, name: 'area_id' })
  areaId: number;

  @Column('integer', { primary: true, name: 'attachment_id' })
  attachmentId: number;

  @ManyToOne(() => Areas, (areas) => areas.areaMedias, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'area_id', referencedColumnName: 'id' }])
  area: Areas;

  @ManyToOne(() => Attachments, (attachments) => attachments.areaMedias, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'attachment_id', referencedColumnName: 'id' }])
  attachment: Attachments;
}
