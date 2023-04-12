import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('PermissionsContexts_pkey_index', ['id'], { unique: true })
@Entity('PermissionsContexts', { schema: 'public' })
export class PermissionsContexts {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'context', length: 255 })
  context: string;

  @Column('varchar', {
    name: 'conditions',
    nullable: true,
    array: true,
    default: () => '(ARRAY[]::character varying[])::character varying(255)[]',
  })
  conditions: string[] | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
