import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('Permissions_pkey_index', ['id'], { unique: true })
@Entity('Permissions', { schema: 'public' })
export class Permissions {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'operation_path', length: 255 })
  operationPath: string;

  @Column('jsonb', { name: 'allowed_roles', nullable: true })
  allowedRoles: object | null;

  @Column('character varying', { name: 'context', length: 255 })
  context: string;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
