import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Assignments } from './Assignments';
import { CarrierAssignmentTypes } from './CarrierAssignmentTypes';
import { AssignmentTypeModifiers } from './AssignmentTypeModifiers';
import { CarrierProcessFlowScenarios } from './CarrierProcessFlowScenarios';

@Index(
  'CarrierAssignmentTypeModifiers_unique_pair_index',
  ['carrierAssignmentTypeId', 'typeModifierEntityId'],
  { unique: true },
)
@Index('CarrierAssignmentTypeModifiers_pkey_index', ['id'], { unique: true })
@Entity('CarrierAssignmentTypeModifiers', { schema: 'public' })
export class CarrierAssignmentTypeModifiers {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @Column('integer', { name: 'seq' })
  seq: number;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('integer', { name: 'carrier_assignment_type_id', nullable: true })
  carrierAssignmentTypeId: number | null;

  @Column('integer', { name: 'type_modifier_entity_id', nullable: true })
  typeModifierEntityId: number | null;

  @OneToMany(() => Assignments, (assignments) => assignments.typeModifier)
  assignments: Assignments[];

  @ManyToOne(
    () => CarrierAssignmentTypes,
    (carrierAssignmentTypes) =>
      carrierAssignmentTypes.carrierAssignmentTypeModifiers,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'carrier_assignment_type_id', referencedColumnName: 'id' },
  ])
  carrierAssignmentType: CarrierAssignmentTypes;

  @ManyToOne(
    () => AssignmentTypeModifiers,
    (assignmentTypeModifiers) =>
      assignmentTypeModifiers.carrierAssignmentTypeModifiers,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'type_modifier_entity_id', referencedColumnName: 'id' }])
  typeModifierEntity: AssignmentTypeModifiers;

  @OneToMany(
    () => CarrierProcessFlowScenarios,
    (carrierProcessFlowScenarios) =>
      carrierProcessFlowScenarios.carrierAssignmentTypeModifier,
  )
  carrierProcessFlowScenarios: CarrierProcessFlowScenarios[];
}
