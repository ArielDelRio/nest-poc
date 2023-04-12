import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserSpecialityServices } from './UserSpecialityServices';
import { VendorSpecialty } from './VendorSpecialty';

@Index('Specialities_pkey_index', ['id'], { unique: true })
@Entity('Specialities', { schema: 'public' })
export class Specialities {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'caption', length: 255 })
  caption: string;

  @Column('boolean', { name: 'active', default: () => 'false' })
  active: boolean;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(
    () => UserSpecialityServices,
    (userSpecialityServices) => userSpecialityServices.speciality,
  )
  userSpecialityServices: UserSpecialityServices[];

  @OneToMany(
    () => VendorSpecialty,
    (vendorSpecialty) => vendorSpecialty.speciality,
  )
  vendorSpecialties: VendorSpecialty[];
}
