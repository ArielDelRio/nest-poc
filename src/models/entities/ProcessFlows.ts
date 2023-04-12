import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarrierProcessFlows } from './CarrierProcessFlows';

@Index('ProcessFlows_pkey_1_index', ['id'], { unique: true })
@Entity('ProcessFlows', { schema: 'public' })
export class ProcessFlows {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'caption', length: 255 })
  caption: string;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 255,
  })
  description: string | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(
    () => CarrierProcessFlows,
    (carrierProcessFlows) => carrierProcessFlows.flow,
  )
  carrierProcessFlows: CarrierProcessFlows[];
}
