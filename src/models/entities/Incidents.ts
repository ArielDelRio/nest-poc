import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Claims } from './Claims';

@Index('Incidents_pkey_index', ['id'], { unique: true })
@Entity('Incidents', { schema: 'public' })
export class Incidents {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'title', length: 255 })
  title: string;

  @Column('character varying', { name: 'description', length: 255 })
  description: string;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @Column('character varying', { name: 'status', length: 255 })
  status: string;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Claims, (claims) => claims.incident)
  claims: Claims[];
}
