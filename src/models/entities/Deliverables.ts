import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('Deliverables_pkey1_index', ['id'], { unique: true })
@Entity('Deliverables', { schema: 'public' })
export class Deliverables {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', { name: 'active' })
  active: boolean;

  @Column('enum', { name: 'type', enum: ['TaskForm', 'Upload'] })
  type: 'TaskForm' | 'Upload';

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('character varying', { name: 'caption', length: 255 })
  caption: string;

  @Column('timestamp with time zone', { name: 'effective_at' })
  effectiveAt: Date;

  @Column('jsonb', { name: 'render_def', nullable: true })
  renderDef: object | null;

  @Column('jsonb', { name: 'data_def', nullable: true })
  dataDef: object | null;

  @Column('jsonb', { name: 'resolution_def', nullable: true })
  resolutionDef: object | null;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
