import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Carriers } from './Carriers';
import { Vendors } from './Vendors';

@Index('VendorCarrier_pkey_index', ['carrierId', 'vendorId'], { unique: true })
@Entity('VendorCarrier', { schema: 'public' })
export class VendorCarrier {
  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('integer', { primary: true, name: 'carrier_id' })
  carrierId: number;

  @Column('integer', { primary: true, name: 'vendor_id' })
  vendorId: number;

  @ManyToOne(() => Carriers, (carriers) => carriers.vendorCarriers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'carrier_id', referencedColumnName: 'id' }])
  carrier: Carriers;

  @ManyToOne(() => Vendors, (vendors) => vendors.vendorCarriers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'vendor_id', referencedColumnName: 'id' }])
  vendor: Vendors;
}
