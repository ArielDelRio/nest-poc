import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './Users';
import { Vendors } from './Vendors';

@Index('VendorUserPreferences_pkey_index', ['userId', 'vendorId'], {
  unique: true,
})
@Entity('VendorUserPreferences', { schema: 'public' })
export class VendorUserPreferences {
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

  @Column('integer', { primary: true, name: 'user_id' })
  userId: number;

  @Column('integer', { primary: true, name: 'vendor_id' })
  vendorId: number;

  @ManyToOne(() => Users, (users) => users.vendorUserPreferences, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(() => Vendors, (vendors) => vendors.vendorUserPreferences, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'vendor_id', referencedColumnName: 'id' }])
  vendor: Vendors;
}
