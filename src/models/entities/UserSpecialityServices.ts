import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Services } from './Services';
import { Specialities } from './Specialities';
import { Users } from './Users';

@Index('UserSpecialityServices_pkey_index', ['id'], { unique: true })
@Entity('UserSpecialityServices', { schema: 'public' })
export class UserSpecialityServices {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Services, (services) => services.userSpecialityServices, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'service_id', referencedColumnName: 'id' }])
  service: Services;

  @ManyToOne(
    () => Specialities,
    (specialities) => specialities.userSpecialityServices,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'speciality_id', referencedColumnName: 'id' }])
  speciality: Specialities;

  @ManyToOne(() => Users, (users) => users.userSpecialityServices, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
