import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Carriers } from './Carriers';
import { Users } from './Users';

@Index('UserCarriers_pkey_index_index', ['carrierId', 'userId'], {
  unique: true,
})
@Entity('UserCarriers', { schema: 'public' })
export class UserCarriers {
  @Column('boolean', { name: 'active', default: () => 'false' })
  active: boolean;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('integer', { primary: true, name: 'carrier_id' })
  carrierId: number;

  @Column('integer', { primary: true, name: 'user_id' })
  userId: number;

  @ManyToOne(() => Carriers, (carriers) => carriers.userCarriers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'carrier_id', referencedColumnName: 'id' }])
  carrier: Carriers;

  @ManyToOne(() => Users, (users) => users.userCarriers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
