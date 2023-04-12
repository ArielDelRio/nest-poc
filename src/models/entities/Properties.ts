import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Claims } from './Claims';
import { Phones } from './Phones';

@Index('Properties_pkey_index', ['id'], { unique: true })
@Entity('Properties', { schema: 'public' })
export class Properties {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'type', nullable: true, length: 255 })
  type: string | null;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 255,
  })
  description: string | null;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @Column('jsonb', { name: 'contact_points', nullable: true })
  contactPoints: object | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('integer', { name: 'address_id', nullable: true })
  addressId: number | null;

  @OneToMany(() => Claims, (claims) => claims.property)
  claims: Claims[];

  @ManyToOne(() => Phones, (phones) => phones.properties, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'phone_id', referencedColumnName: 'id' }])
  phone: Phones;
}
