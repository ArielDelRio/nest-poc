import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attachments } from './Attachments';
import { ClaimContacts } from './ClaimContacts';
import { Users } from './Users';
import { Carriers } from './Carriers';
import { Cases } from './Cases';
import { ClaimStatuses } from './ClaimStatuses';
import { DeductibleCodes } from './DeductibleCodes';
import { Incidents } from './Incidents';
import { LineOfBusinesses } from './LineOfBusinesses';
import { ClaimLossTypePairs } from './ClaimLossTypePairs';
import { PolicyTypes } from './PolicyTypes';
import { Properties } from './Properties';
import { Conversations } from './Conversations';
import { Inspections } from './Inspections';
import { Notes } from './Notes';
import { Vouchers } from './Vouchers';
import { Works } from './Works';

@Index('Claims_pkey_index', ['id'], { unique: true })
@Entity('Claims', { schema: 'public' })
export class Claims {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'carrier_claim_number', length: 255 })
  carrierClaimNumber: string;

  @Column('text', { name: 'loss_description' })
  lossDescription: string;

  @Column('timestamp with time zone', { name: 'loss_date' })
  lossDate: Date;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @Column('boolean', { name: 'active' })
  active: boolean;

  @Column('character varying', {
    name: 'catastrophe_code',
    nullable: true,
    length: 255,
  })
  catastropheCode: string | null;

  @Column('character varying', { name: 'policy_number', length: 255 })
  policyNumber: string;

  @Column('timestamp with time zone', {
    name: 'policy_effective_date',
    nullable: true,
  })
  policyEffectiveDate: Date | null;

  @Column('integer', { name: 'estimated_effort' })
  estimatedEffort: number;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('jsonb', { name: 'policy_data', nullable: true })
  policyData: object | null;

  @Column('jsonb', { name: 'reserve', nullable: true })
  reserve: object | null;

  @OneToMany(() => Attachments, (attachments) => attachments.claim)
  attachments: Attachments[];

  @OneToMany(() => ClaimContacts, (claimContacts) => claimContacts.claim)
  claimContacts: ClaimContacts[];

  @ManyToOne(() => Users, (users) => users.claims, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'adjuster_id', referencedColumnName: 'id' }])
  adjuster: Users;

  @ManyToOne(() => Carriers, (carriers) => carriers.claims, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'carrier_id', referencedColumnName: 'id' }])
  carrier: Carriers;

  @ManyToOne(() => Cases, (cases) => cases.claims, { onDelete: 'SET NULL' })
  @JoinColumn([{ name: 'case_id', referencedColumnName: 'id' }])
  case: Cases;

  @ManyToOne(() => ClaimStatuses, (claimStatuses) => claimStatuses.claims, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'claim_status_id', referencedColumnName: 'id' }])
  claimStatus: ClaimStatuses;

  @ManyToOne(
    () => DeductibleCodes,
    (deductibleCodes) => deductibleCodes.claims,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'deductible_code_id', referencedColumnName: 'id' }])
  deductibleCode: DeductibleCodes;

  @ManyToOne(() => Incidents, (incidents) => incidents.claims, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'incident_id', referencedColumnName: 'id' }])
  incident: Incidents;

  @ManyToOne(() => Users, (users) => users.claims2, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'independent_adjuster_id', referencedColumnName: 'id' }])
  independentAdjuster: Users;

  @ManyToOne(
    () => LineOfBusinesses,
    (lineOfBusinesses) => lineOfBusinesses.claims,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'line_of_business_id', referencedColumnName: 'id' }])
  lineOfBusiness: LineOfBusinesses;

  @ManyToOne(
    () => ClaimLossTypePairs,
    (claimLossTypePairs) => claimLossTypePairs.claims,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'loss_type_pair_id', referencedColumnName: 'id' }])
  lossTypePair: ClaimLossTypePairs;

  @ManyToOne(() => PolicyTypes, (policyTypes) => policyTypes.claims, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'policy_type_id', referencedColumnName: 'id' }])
  policyType: PolicyTypes;

  @ManyToOne(() => Properties, (properties) => properties.claims, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'property_id', referencedColumnName: 'id' }])
  property: Properties;

  @OneToMany(() => Conversations, (conversations) => conversations.claim)
  conversations: Conversations[];

  @OneToMany(() => Inspections, (inspections) => inspections.claim)
  inspections: Inspections[];

  @OneToMany(() => Notes, (notes) => notes.claim)
  notes: Notes[];

  @OneToMany(() => Vouchers, (vouchers) => vouchers.claim)
  vouchers: Vouchers[];

  @OneToMany(() => Works, (works) => works.claim)
  works: Works[];
}
