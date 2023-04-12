import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarrierCaseTypes } from './CarrierCaseTypes';
import { CarrierLineOfBusiness } from './CarrierLineOfBusiness';
import { CarrierProcessFlows } from './CarrierProcessFlows';
import { CarrierVendorPreferences } from './CarrierVendorPreferences';
import { Contacts } from './Contacts';
import { Cases } from './Cases';
import { Claims } from './Claims';
import { InspQuestionsLookups } from './InspQuestionsLookups';
import { Stages } from './Stages';
import { UserCarriers } from './UserCarriers';
import { VendorCarrier } from './VendorCarrier';

@Index('Carriers_pkey_index', ['id'], { unique: true })
@Entity('Carriers', { schema: 'public' })
export class Carriers {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', { name: 'active', default: () => 'false' })
  active: boolean;

  @Column('integer', { name: 'status' })
  status: number;

  @Column('character varying', { name: 'type', length: 255 })
  type: string;

  @Column('character varying', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('character varying', {
    name: 'short_name',
    nullable: true,
    length: 255,
  })
  shortName: string | null;

  @Column('character varying', { name: 'legal_name', length: 255 })
  legalName: string;

  @Column('character varying', { name: 'web_url', nullable: true, length: 255 })
  webUrl: string | null;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @Column('character varying', { name: 'logo', nullable: true, length: 255 })
  logo: string | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(
    () => CarrierCaseTypes,
    (carrierCaseTypes) => carrierCaseTypes.carrier,
  )
  carrierCaseTypes: CarrierCaseTypes[];

  @OneToMany(
    () => CarrierLineOfBusiness,
    (carrierLineOfBusiness) => carrierLineOfBusiness.carrier,
  )
  carrierLineOfBusinesses: CarrierLineOfBusiness[];

  @OneToMany(
    () => CarrierProcessFlows,
    (carrierProcessFlows) => carrierProcessFlows.carrier,
  )
  carrierProcessFlows: CarrierProcessFlows[];

  @OneToMany(
    () => CarrierVendorPreferences,
    (carrierVendorPreferences) => carrierVendorPreferences.carrier,
  )
  carrierVendorPreferences: CarrierVendorPreferences[];

  @ManyToOne(() => Contacts, (contacts) => contacts.carriers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'contact_id', referencedColumnName: 'id' }])
  contact: Contacts;

  @OneToMany(() => Cases, (cases) => cases.carrier)
  cases: Cases[];

  @OneToMany(() => Claims, (claims) => claims.carrier)
  claims: Claims[];

  @OneToMany(
    () => InspQuestionsLookups,
    (inspQuestionsLookups) => inspQuestionsLookups.byCarrierRef2,
  )
  inspQuestionsLookups: InspQuestionsLookups[];

  @OneToMany(() => Stages, (stages) => stages.carrier)
  stages: Stages[];

  @OneToMany(() => UserCarriers, (userCarriers) => userCarriers.carrier)
  userCarriers: UserCarriers[];

  @OneToMany(() => VendorCarrier, (vendorCarrier) => vendorCarrier.carrier)
  vendorCarriers: VendorCarrier[];
}
