import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LineOfBusinesses } from './LineOfBusinesses';

@Index('LobCoverages_pkey_index', ['id'], { unique: true })
@Entity('LobCoverages', { schema: 'public' })
export class LobCoverages {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @Column('character varying', { name: 'code', length: 255 })
  code: string;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 255,
  })
  description: string | null;

  @Column('character varying', {
    name: 'limit_name',
    nullable: true,
    length: 255,
  })
  limitName: string | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(
    () => LineOfBusinesses,
    (lineOfBusinesses) => lineOfBusinesses.lobCoverages,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'line_of_business_id', referencedColumnName: 'id' }])
  lineOfBusiness: LineOfBusinesses;
}
