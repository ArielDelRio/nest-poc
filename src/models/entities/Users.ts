import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Claims } from './Claims';
import { Contacts } from './Contacts';
import { Inspections } from './Inspections';
import { UserCarriers } from './UserCarriers';
import { UserFcmTokens } from './UserFcmTokens';
import { UserLanguages } from './UserLanguages';
import { UserServiceAreas } from './UserServiceAreas';
import { UserSpecialityServices } from './UserSpecialityServices';
import { UserVendors } from './UserVendors';
import { VendorUserPreferences } from './VendorUserPreferences';
import { Works } from './Works';

@Index('Users_pkey_index', ['id'], { unique: true })
@Entity('Users', { schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', {
    name: 'full_name',
    nullable: true,
    length: 255,
  })
  fullName: string | null;

  @Column('character varying', {
    name: 'username',
    nullable: true,
    length: 255,
  })
  username: string | null;

  @Column('character varying', { name: 'email', length: 255 })
  email: string;

  @Column('enum', {
    name: 'role',
    enum: [
      'SUPER-USER',
      'ADMINISTRATOR',
      'MANAGER',
      'SUPERVISOR',
      'EXAMINER',
      'INSPECTOR',
      'ADJUSTER',
      'TRAINER',
      'VOUCHER-USER',
    ],
  })
  role:
    | 'SUPER-USER'
    | 'ADMINISTRATOR'
    | 'MANAGER'
    | 'SUPERVISOR'
    | 'EXAMINER'
    | 'INSPECTOR'
    | 'ADJUSTER'
    | 'TRAINER'
    | 'VOUCHER-USER';

  @Column('enum', {
    name: 'speciality',
    nullable: true,
    enum: [
      'Painters',
      'Fencers',
      'Landscapers',
      'General Contractor',
      'Roofer',
      'Ladder Assist',
      'Electrician',
      'HVAC',
      'Plumber',
      'Temp Repair',
      'Board Up Company',
      'Water Mitigation',
      'Content Restoration',
      'Dry Cleaners',
      'Cause and Origin',
      'Leak Detection',
      'Engineer',
      'Electronics Technician',
      'Attorney',
      'DAT (Data Acquisition Technician)',
      'DAP (Data Acquisition Pro)',
      'DTI (Data Thermal Imaging)',
      'ADS (Aerial Data Specialist - Drone)',
    ],
  })
  speciality:
    | 'Painters'
    | 'Fencers'
    | 'Landscapers'
    | 'General Contractor'
    | 'Roofer'
    | 'Ladder Assist'
    | 'Electrician'
    | 'HVAC'
    | 'Plumber'
    | 'Temp Repair'
    | 'Board Up Company'
    | 'Water Mitigation'
    | 'Content Restoration'
    | 'Dry Cleaners'
    | 'Cause and Origin'
    | 'Leak Detection'
    | 'Engineer'
    | 'Electronics Technician'
    | 'Attorney'
    | 'DAT (Data Acquisition Technician)'
    | 'DAP (Data Acquisition Pro)'
    | 'DTI (Data Thermal Imaging)'
    | 'ADS (Aerial Data Specialist - Drone)'
    | null;

  @Column({
    enum: ['Pending', 'Active', 'Inactive'],
    default: 'Pending',
  })
  status: 'Pending' | 'Active' | 'Inactive';

  @Column('character varying', { name: 'avatar', nullable: true, length: 255 })
  avatar: string | null;

  @Column('uuid', { name: 'activation_code', nullable: true })
  activationCode: string | null;

  @Column('boolean', { name: 'is_tc', nullable: true, default: () => 'false' })
  isTc: boolean | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Claims, (claims) => claims.adjuster)
  claims: Claims[];

  @OneToMany(() => Claims, (claims) => claims.independentAdjuster)
  claims2: Claims[];

  @OneToMany(() => Contacts, (contacts) => contacts.user)
  contacts: Contacts[];

  @OneToMany(() => Inspections, (inspections) => inspections.authorUser)
  inspections: Inspections[];

  @OneToMany(() => UserCarriers, (userCarriers) => userCarriers.user)
  userCarriers: UserCarriers[];

  @OneToMany(() => UserFcmTokens, (userFcmTokens) => userFcmTokens.user)
  userFcmTokens: UserFcmTokens[];

  @OneToMany(() => UserLanguages, (userLanguages) => userLanguages.user)
  userLanguages: UserLanguages[];

  @OneToMany(
    () => UserServiceAreas,
    (userServiceAreas) => userServiceAreas.user,
  )
  userServiceAreas: UserServiceAreas[];

  @OneToMany(
    () => UserSpecialityServices,
    (userSpecialityServices) => userSpecialityServices.user,
  )
  userSpecialityServices: UserSpecialityServices[];

  @OneToMany(() => UserVendors, (userVendors) => userVendors.user)
  userVendors: UserVendors[];

  @OneToMany(
    () => VendorUserPreferences,
    (vendorUserPreferences) => vendorUserPreferences.user,
  )
  vendorUserPreferences: VendorUserPreferences[];

  @OneToMany(() => Works, (works) => works.assignmentUser)
  works: Works[];
}
