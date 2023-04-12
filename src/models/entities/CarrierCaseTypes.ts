import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarrierAssignmentTypes } from './CarrierAssignmentTypes';
import { Carriers } from './Carriers';
import { CaseTypes } from './CaseTypes';
import { CarrierProcessFlowScenarios } from './CarrierProcessFlowScenarios';
import { Cases } from './Cases';

@Index('CarrierCaseTypes_unique_pair_index', ['carrierId', 'typeEntityId'], {
  unique: true,
})
@Index('CarrierCaseTypes_pkey_index', ['id'], { unique: true })
@Entity('CarrierCaseTypes', { schema: 'public' })
export class CarrierCaseTypes {
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

  @Column('integer', { name: 'carrier_id', nullable: true })
  carrierId: number | null;

  @Column('integer', { name: 'type_entity_id', nullable: true })
  typeEntityId: number | null;

  @OneToMany(
    () => CarrierAssignmentTypes,
    (carrierAssignmentTypes) => carrierAssignmentTypes.carrierCaseType,
  )
  carrierAssignmentTypes: CarrierAssignmentTypes[];

  @ManyToOne(() => Carriers, (carriers) => carriers.carrierCaseTypes, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'carrier_id', referencedColumnName: 'id' }])
  carrier: Carriers;

  @ManyToOne(() => CaseTypes, (caseTypes) => caseTypes.carrierCaseTypes, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'type_entity_id', referencedColumnName: 'id' }])
  typeEntity: CaseTypes;

  @OneToMany(
    () => CarrierProcessFlowScenarios,
    (carrierProcessFlowScenarios) =>
      carrierProcessFlowScenarios.carrierCaseType,
  )
  carrierProcessFlowScenarios: CarrierProcessFlowScenarios[];

  @OneToMany(() => Cases, (cases) => cases.carrierCaseType)
  cases: Cases[];
}
