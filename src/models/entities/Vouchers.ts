import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attachments } from './Attachments';
import { Claims } from './Claims';
import { VoucherTypes } from './VoucherTypes';

@Index('Vouchers_pkey_index', ['id'], { unique: true })
@Entity('Vouchers', { schema: 'public' })
export class Vouchers {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'redemption_code', length: 255 })
  redemptionCode: string;

  @Column('character varying', { name: 'cycle_status', length: 255 })
  cycleStatus: string;

  @Column('jsonb', { name: 'cycle_dates', nullable: true })
  cycleDates: object | null;

  @Column('jsonb', { name: 'claim_info', nullable: true })
  claimInfo: object | null;

  @Column('jsonb', { name: 'order_info', nullable: true })
  orderInfo: object | null;

  @Column('jsonb', { name: 'redemption_info', nullable: true })
  redemptionInfo: object | null;

  @Column('jsonb', { name: 'activities', nullable: true })
  activities: object | null;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Attachments, (attachments) => attachments.voucher)
  attachments: Attachments[];

  @ManyToOne(() => Claims, (claims) => claims.vouchers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'claim_id', referencedColumnName: 'id' }])
  claim: Claims;

  @ManyToOne(() => VoucherTypes, (voucherTypes) => voucherTypes.vouchers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'type_id', referencedColumnName: 'id' }])
  type: VoucherTypes;
}
