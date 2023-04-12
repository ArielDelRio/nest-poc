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
import { CarrierAssignmentTypeModifiers } from './CarrierAssignmentTypeModifiers';
import { CarrierCaseTypes } from './CarrierCaseTypes';
import { AssignmentTypes } from './AssignmentTypes';
import { CarrierProcessFlowScenarios } from './CarrierProcessFlowScenarios';

@Index(
  'CarrierAssignmentTypes_unique_pair_index',
  ['carrierCaseTypeId', 'typeEntityId'],
  { unique: true },
)
@Index('CarrierAssignmentTypes_pkey_index', ['id'], { unique: true })
@Entity('CarrierAssignmentTypes', { schema: 'public' })
export class CarrierAssignmentTypes {
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

  @Column('integer', { name: 'carrier_case_type_id', nullable: true })
  carrierCaseTypeId: number | null;

  @Column('integer', { name: 'type_entity_id', nullable: true })
  typeEntityId: number | null;

  @OneToMany(() => Assignments, (assignments) => assignments.type)
  assignments: Assignments[];

  @OneToMany(
    () => CarrierAssignmentTypeModifiers,
    (carrierAssignmentTypeModifiers) =>
      carrierAssignmentTypeModifiers.carrierAssignmentType,
  )
  carrierAssignmentTypeModifiers: CarrierAssignmentTypeModifiers[];

  @ManyToOne(
    () => CarrierCaseTypes,
    (carrierCaseTypes) => carrierCaseTypes.carrierAssignmentTypes,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'carrier_case_type_id', referencedColumnName: 'id' }])
  carrierCaseType: CarrierCaseTypes;

  @ManyToOne(
    () => AssignmentTypes,
    (assignmentTypes) => assignmentTypes.carrierAssignmentTypes,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'type_entity_id', referencedColumnName: 'id' }])
  typeEntity: AssignmentTypes;

  @OneToMany(
    () => CarrierProcessFlowScenarios,
    (carrierProcessFlowScenarios) =>
      carrierProcessFlowScenarios.carrierAssignmentType,
  )
  carrierProcessFlowScenarios: CarrierProcessFlowScenarios[];
}
