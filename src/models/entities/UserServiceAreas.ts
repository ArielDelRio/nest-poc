import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './Users';

@Index('UserServiceAreas_pkey_index', ['addressId', 'userId'], { unique: true })
@Entity('UserServiceAreas', { schema: 'public' })
export class UserServiceAreas {
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

  @Column('integer', { primary: true, name: 'address_id' })
  addressId: number;

  @ManyToOne(() => Users, (users) => users.userServiceAreas, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
