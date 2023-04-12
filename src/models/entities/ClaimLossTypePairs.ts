import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClaimLossTypes } from './ClaimLossTypes';
import { Claims } from './Claims';
import { Stages } from './Stages';

@Index('ClaimLossTypePairs_pkey_index', ['id'], { unique: true })
@Index('ClaimLossTypePairs_unique_pair_index', ['modifierId', 'typeId'], {
  unique: true,
})
@Entity('ClaimLossTypePairs', { schema: 'public' })
export class ClaimLossTypePairs {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @Column('integer', { name: 'order', default: () => '0' })
  order: number;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('integer', { name: 'type_id', nullable: true })
  typeId: number | null;

  @Column('integer', { name: 'modifier_id', nullable: true })
  modifierId: number | null;

  @ManyToOne(
    () => ClaimLossTypes,
    (claimLossTypes) => claimLossTypes.claimLossTypePairs,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'type_id', referencedColumnName: 'id' }])
  type: ClaimLossTypes;

  @OneToMany(() => Claims, (claims) => claims.lossTypePair)
  claims: Claims[];

  @OneToMany(() => Stages, (stages) => stages.lossTypePair)
  stages: Stages[];
}
