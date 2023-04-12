import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarrierProcessFlowScenarios } from './CarrierProcessFlowScenarios';
import { Carriers } from './Carriers';
import { ProcessFlows } from './ProcessFlows';

@Index('CarrierProcessFlows_pkey_1_index', ['id'], { unique: true })
@Entity('CarrierProcessFlows', { schema: 'public' })
export class CarrierProcessFlows {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp with time zone', { name: 'effective_at' })
  effectiveAt: Date;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('boolean', { name: 'active' })
  active: boolean;

  @Column('jsonb', { name: 'facts', nullable: true })
  facts: object | null;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @OneToMany(
    () => CarrierProcessFlowScenarios,
    (carrierProcessFlowScenarios) => carrierProcessFlowScenarios.carrierFlow,
  )
  carrierProcessFlowScenarios: CarrierProcessFlowScenarios[];

  @ManyToOne(() => Carriers, (carriers) => carriers.carrierProcessFlows, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'carrier_id', referencedColumnName: 'id' }])
  carrier: Carriers;

  @ManyToOne(
    () => ProcessFlows,
    (processFlows) => processFlows.carrierProcessFlows,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'flow_id', referencedColumnName: 'id' }])
  flow: ProcessFlows;
}
