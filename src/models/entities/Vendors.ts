import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarrierVendorPreferences } from './CarrierVendorPreferences';
import { UserVendors } from './UserVendors';
import { VendorCarrier } from './VendorCarrier';
import { VendorServiceAreas } from './VendorServiceAreas';
import { VendorSpecialty } from './VendorSpecialty';
import { VendorUserPreferences } from './VendorUserPreferences';
import { Contacts } from './Contacts';

@Index('Vendors_pkey_index', ['id'], { unique: true })
@Entity('Vendors', { schema: 'public' })
export class Vendors {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', { name: 'active', default: () => 'false' })
  active: boolean;

  @Column('character varying', { name: 'name', nullable: true, length: 255 })
  name: string | null;

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
    () => CarrierVendorPreferences,
    (carrierVendorPreferences) => carrierVendorPreferences.vendor,
  )
  carrierVendorPreferences: CarrierVendorPreferences[];

  @OneToMany(() => UserVendors, (userVendors) => userVendors.vendor)
  userVendors: UserVendors[];

  @OneToMany(() => VendorCarrier, (vendorCarrier) => vendorCarrier.vendor)
  vendorCarriers: VendorCarrier[];

  @OneToMany(
    () => VendorServiceAreas,
    (vendorServiceAreas) => vendorServiceAreas.vendor,
  )
  vendorServiceAreas: VendorServiceAreas[];

  @OneToMany(() => VendorSpecialty, (vendorSpecialty) => vendorSpecialty.vendor)
  vendorSpecialties: VendorSpecialty[];

  @OneToMany(
    () => VendorUserPreferences,
    (vendorUserPreferences) => vendorUserPreferences.vendor,
  )
  vendorUserPreferences: VendorUserPreferences[];

  @ManyToOne(() => Contacts, (contacts) => contacts.vendors, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'contact_id', referencedColumnName: 'id' }])
  contact: Contacts;
}
