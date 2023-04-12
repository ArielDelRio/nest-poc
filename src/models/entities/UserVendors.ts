import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './Users';
import { Vendors } from './Vendors';

@Index('UserVendors_pkey_index', ['userId', 'vendorId'], { unique: true })
@Entity('UserVendors', { schema: 'public' })
export class UserVendors {
  @Column('boolean', { name: 'active', default: () => 'false' })
  active: boolean;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('integer', { primary: true, name: 'user_id' })
  userId: number;

  @Column('integer', { primary: true, name: 'vendor_id' })
  vendorId: number;

  @ManyToOne(() => Users, (users) => users.userVendors, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(() => Vendors, (vendors) => vendors.userVendors, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'vendor_id', referencedColumnName: 'id' }])
  vendor: Vendors;
}
