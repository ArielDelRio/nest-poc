import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vouchers } from './Vouchers';

@Index('VoucherTypes_caption_key_index', ['caption'], { unique: true })
@Index('VoucherTypes_pkey_index', ['id'], { unique: true })
@Entity('VoucherTypes', { schema: 'public' })
export class VoucherTypes {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @Column('character varying', { name: 'caption', unique: true, length: 255 })
  caption: string;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 255,
  })
  description: string | null;

  @Column('integer', { name: 'order', default: () => '0' })
  order: number;

  @Column('varchar', {
    name: 'proc_statuses',
    array: true,
    default: () => '(ARRAY[]::character varying[])::character varying(255)[]',
  })
  procStatuses: string[];

  @Column('jsonb', { name: 'order_attributes', nullable: true })
  orderAttributes: object | null;

  @Column('jsonb', { name: 'redemption_attributes', nullable: true })
  redemptionAttributes: object | null;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Vouchers, (vouchers) => vouchers.type)
  vouchers: Vouchers[];
}
