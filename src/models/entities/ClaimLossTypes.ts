import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClaimLossTypePairs } from './ClaimLossTypePairs';
import { InspQuestionsLookups } from './InspQuestionsLookups';

@Index('ClaimLossTypes_pkey_index', ['id'], { unique: true })
@Index('ClaimLossTypes_title_key_index', ['title'], { unique: true })
@Entity('ClaimLossTypes', { schema: 'public' })
export class ClaimLossTypes {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'title', unique: true, length: 255 })
  title: string;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 255,
  })
  description: string | null;

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

  @OneToMany(
    () => ClaimLossTypePairs,
    (claimLossTypePairs) => claimLossTypePairs.type,
  )
  claimLossTypePairs: ClaimLossTypePairs[];

  @OneToMany(
    () => InspQuestionsLookups,
    (inspQuestionsLookups) => inspQuestionsLookups.byClaimLossTypeRef2,
  )
  inspQuestionsLookups: InspQuestionsLookups[];
}
