import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('SubjectDefs_pkey_index', ['id'], { unique: true })
@Entity('SubjectDefs', { schema: 'public' })
export class SubjectDefs {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('jsonb', { name: 'def', nullable: true })
  def: object | null;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
