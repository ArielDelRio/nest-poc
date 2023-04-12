import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AssignmentTeamMembers } from './AssignmentTeamMembers';
import { Contacts } from './Contacts';
import { Cases } from './Cases';
import { AssignmentStatuses } from './AssignmentStatuses';
import { CarrierAssignmentTypes } from './CarrierAssignmentTypes';
import { CarrierAssignmentTypeModifiers } from './CarrierAssignmentTypeModifiers';
import { Works } from './Works';

@Index('Assignments_pkey_index', ['id'], { unique: true })
@Entity('Assignments', { schema: 'public' })
export class Assignments {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @Column('jsonb', { name: 'process_flow', nullable: true })
  processFlow: object | null;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(
    () => AssignmentTeamMembers,
    (assignmentTeamMembers) => assignmentTeamMembers.assignment,
  )
  assignmentTeamMembers: AssignmentTeamMembers[];

  @ManyToOne(() => Contacts, (contacts) => contacts.assignments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    { name: 'assigned_organization_id', referencedColumnName: 'id' },
  ])
  assignedOrganization: Contacts;

  @ManyToOne(() => Contacts, (contacts) => contacts.assignments2, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    { name: 'assigner_organization_id', referencedColumnName: 'id' },
  ])
  assignerOrganization: Contacts;

  @ManyToOne(() => Cases, (cases) => cases.assignments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'case_id', referencedColumnName: 'id' }])
  case: Cases;

  @ManyToOne(
    () => AssignmentStatuses,
    (assignmentStatuses) => assignmentStatuses.assignments,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'status_id', referencedColumnName: 'id' }])
  status: AssignmentStatuses;

  @ManyToOne(
    () => CarrierAssignmentTypes,
    (carrierAssignmentTypes) => carrierAssignmentTypes.assignments,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'type_id', referencedColumnName: 'id' }])
  type: CarrierAssignmentTypes;

  @ManyToOne(
    () => CarrierAssignmentTypeModifiers,
    (carrierAssignmentTypeModifiers) =>
      carrierAssignmentTypeModifiers.assignments,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'type_modifier_id', referencedColumnName: 'id' }])
  typeModifier: CarrierAssignmentTypeModifiers;

  @OneToMany(() => Works, (works) => works.assignment)
  works: Works[];
}
