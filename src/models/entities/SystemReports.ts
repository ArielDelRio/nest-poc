import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('SystemReports_pkey_index', ['id'], { unique: true })
@Entity('SystemReports', { schema: 'public' })
export class SystemReports {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'title', length: 255 })
  title: string;

  @Column('character varying', { name: 'url', length: 255 })
  url: string;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
