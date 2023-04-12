import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carriers } from './Carriers';
import { LineOfBusinesses } from './LineOfBusinesses';
import { ClaimLossTypePairs } from './ClaimLossTypePairs';
import { Tasks } from './Tasks';

@Index('Stages_pkey_index', ['id'], { unique: true })
@Entity('Stages', { schema: 'public' })
export class Stages {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', { name: 'catastrophic', nullable: true })
  catastrophic: boolean | null;

  @Column('character varying', { name: 'caption', length: 255 })
  caption: string;

  @Column('integer', { name: 'seq' })
  seq: number;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('numeric', {
    name: 'percentage_of_effort',
    nullable: true,
    default: () => '0',
  })
  percentageOfEffort: string | null;

  @ManyToOne(() => Carriers, (carriers) => carriers.stages, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'carrier_id', referencedColumnName: 'id' }])
  carrier: Carriers;

  @ManyToOne(
    () => LineOfBusinesses,
    (lineOfBusinesses) => lineOfBusinesses.stages,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'line_of_business_id', referencedColumnName: 'id' }])
  lineOfBusiness: LineOfBusinesses;

  @ManyToOne(
    () => ClaimLossTypePairs,
    (claimLossTypePairs) => claimLossTypePairs.stages,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'loss_type_pair_id', referencedColumnName: 'id' }])
  lossTypePair: ClaimLossTypePairs;

  @OneToMany(() => Tasks, (tasks) => tasks.stage)
  tasks: Tasks[];
}
