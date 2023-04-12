import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Vendors } from './Vendors';

@Index('VendorServiceAreas_pkey_index', ['addressId', 'vendorId'], {
  unique: true,
})
@Entity('VendorServiceAreas', { schema: 'public' })
export class VendorServiceAreas {
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

  @Column('integer', { primary: true, name: 'vendor_id' })
  vendorId: number;

  @Column('integer', { primary: true, name: 'address_id' })
  addressId: number;

  @ManyToOne(() => Vendors, (vendors) => vendors.vendorServiceAreas, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'vendor_id', referencedColumnName: 'id' }])
  vendor: Vendors;
}
