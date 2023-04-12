import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('Imports_carrier_claim_number_key_index', ['carrierClaimNumber'], {
  unique: true,
})
@Index('Imports_pkey_index', ['carrierClaimNumber', 'id'], { unique: true })
@Entity('Imports', { schema: 'public' })
export class Imports {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', {
    primary: true,
    name: 'carrier_claim_number',
    length: 255,
  })
  carrierClaimNumber: string;

  @Column('boolean', { name: 'active' })
  active: boolean;

  @Column('character varying', { name: 'status', nullable: true, length: 255 })
  status: string | null;

  @Column('character varying', {
    name: 'last_msg',
    nullable: true,
    length: 255,
  })
  lastMsg: string | null;

  @Column('character varying', { name: 'txs', nullable: true, length: 255 })
  txs: string | null;

  @Column('jsonb', { name: 'original_data', nullable: true })
  originalData: object | null;

  @Column('jsonb', { name: 'cached_data', nullable: true })
  cachedData: object | null;

  @Column('integer', { name: 'claim_id', nullable: true })
  claimId: number | null;

  @Column('integer', { name: 'carrier_id', nullable: true })
  carrierId: number | null;

  @Column('jsonb', { name: 'history', nullable: true })
  history: object | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
