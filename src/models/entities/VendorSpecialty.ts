import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Specialities } from './Specialities';
import { Vendors } from './Vendors';

@Index('VendorSpecialty_pkey_index', ['specialityId', 'vendorId'], {
  unique: true,
})
@Entity('VendorSpecialty', { schema: 'public' })
export class VendorSpecialty {
  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('integer', { primary: true, name: 'speciality_id' })
  specialityId: number;

  @Column('integer', { primary: true, name: 'vendor_id' })
  vendorId: number;

  @Column('jsonb', { name: 'costs', nullable: true })
  costs: object | null;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @ManyToOne(
    () => Specialities,
    (specialities) => specialities.vendorSpecialties,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'speciality_id', referencedColumnName: 'id' }])
  speciality: Specialities;

  @ManyToOne(() => Vendors, (vendors) => vendors.vendorSpecialties, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'vendor_id', referencedColumnName: 'id' }])
  vendor: Vendors;
}
