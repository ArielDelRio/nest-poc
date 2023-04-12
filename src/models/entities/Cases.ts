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
import { CarrierCaseTypes } from './CarrierCaseTypes';
import { Carriers } from './Carriers';
import { Claims } from './Claims';

@Index('Cases_pkey_index', ['id'], { unique: true })
@Entity('Cases', { schema: 'public' })
export class Cases {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Assignments, (assignments) => assignments.case)
  assignments: Assignments[];

  @ManyToOne(
    () => CarrierCaseTypes,
    (carrierCaseTypes) => carrierCaseTypes.cases,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'carrier_case_type_id', referencedColumnName: 'id' }])
  carrierCaseType: CarrierCaseTypes;

  @ManyToOne(() => Carriers, (carriers) => carriers.cases, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'carrier_id', referencedColumnName: 'id' }])
  carrier: Carriers;

  @ManyToOne(() => Cases, (cases) => cases.cases, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'predecesor_case_id', referencedColumnName: 'id' }])
  predecesorCase: Cases;

  @OneToMany(() => Cases, (cases) => cases.predecesorCase)
  cases: Cases[];

  @OneToMany(() => Claims, (claims) => claims.case)
  claims: Claims[];
}
