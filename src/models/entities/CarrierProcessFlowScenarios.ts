import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarrierAssignmentTypes } from './CarrierAssignmentTypes';
import { CarrierAssignmentTypeModifiers } from './CarrierAssignmentTypeModifiers';
import { CarrierCaseTypes } from './CarrierCaseTypes';
import { CarrierProcessFlows } from './CarrierProcessFlows';
import { LineOfBusinesses } from './LineOfBusinesses';

@Index('CarrierProcessFlowScenarios_pkey_1_index', ['id'], { unique: true })
@Entity('CarrierProcessFlowScenarios', { schema: 'public' })
export class CarrierProcessFlowScenarios {
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

  @Column('character varying', { name: 'caption', nullable: true, length: 255 })
  caption: string | null;

  @Column('text', { name: 'description' })
  description: string;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @Column('jsonb', { name: 'event', nullable: true })
  event: object | null;

  @Column('jsonb', { name: 'conditions', nullable: true })
  conditions: object | null;

  @ManyToOne(
    () => CarrierAssignmentTypes,
    (carrierAssignmentTypes) =>
      carrierAssignmentTypes.carrierProcessFlowScenarios,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'carrier_assignment_type_id', referencedColumnName: 'id' },
  ])
  carrierAssignmentType: CarrierAssignmentTypes;

  @ManyToOne(
    () => CarrierAssignmentTypeModifiers,
    (carrierAssignmentTypeModifiers) =>
      carrierAssignmentTypeModifiers.carrierProcessFlowScenarios,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'carrier_assignment_type_modifier_id', referencedColumnName: 'id' },
  ])
  carrierAssignmentTypeModifier: CarrierAssignmentTypeModifiers;

  @ManyToOne(
    () => CarrierCaseTypes,
    (carrierCaseTypes) => carrierCaseTypes.carrierProcessFlowScenarios,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'carrier_case_type_id', referencedColumnName: 'id' }])
  carrierCaseType: CarrierCaseTypes;

  @ManyToOne(
    () => CarrierProcessFlows,
    (carrierProcessFlows) => carrierProcessFlows.carrierProcessFlowScenarios,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'carrier_flow_id', referencedColumnName: 'id' }])
  carrierFlow: CarrierProcessFlows;

  @ManyToOne(
    () => LineOfBusinesses,
    (lineOfBusinesses) => lineOfBusinesses.carrierProcessFlowScenarios,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'carrier_lob_id', referencedColumnName: 'id' }])
  carrierLob: LineOfBusinesses;
}
