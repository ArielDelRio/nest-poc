import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('FnolRuns_pkey_index', ['id'], { unique: true })
@Entity('FnolRuns', { schema: 'public' })
export class FnolRuns {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'phone_number', length: 255 })
  phoneNumber: string;

  @Column('boolean', { name: 'completed' })
  completed: boolean;

  @Column('jsonb', { name: 'info', nullable: true })
  info: object | null;

  @Column('text', { name: 'annotations', nullable: true })
  annotations: string | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
