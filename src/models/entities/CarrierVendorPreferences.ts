import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Carriers } from './Carriers';
import { Vendors } from './Vendors';

@Index('CarrierVendorPreferences_pkey_index', ['carrierId', 'vendorId'], {
  unique: true,
})
@Entity('CarrierVendorPreferences', { schema: 'public' })
export class CarrierVendorPreferences {
  @Column('integer', { name: 'preference_level', default: () => '0' })
  preferenceLevel: number;

  @Column('int4', {
    name: 'for_specialities',
    nullable: true,
    array: true,
    default: () => 'ARRAY[]::integer[]',
  })
  forSpecialities: number[] | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('integer', { primary: true, name: 'carrier_id' })
  carrierId: number;

  @Column('integer', { primary: true, name: 'vendor_id' })
  vendorId: number;

  @ManyToOne(() => Carriers, (carriers) => carriers.carrierVendorPreferences, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'carrier_id', referencedColumnName: 'id' }])
  carrier: Carriers;

  @ManyToOne(() => Vendors, (vendors) => vendors.carrierVendorPreferences, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'vendor_id', referencedColumnName: 'id' }])
  vendor: Vendors;
}
