import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InspQuestionsLookups } from './InspQuestionsLookups';

@Index('ClaimLossTypeModifiers_pkey_index', ['id'], { unique: true })
@Index('ClaimLossTypeModifiers_title_key_index', ['title'], { unique: true })
@Entity('ClaimLossTypeModifiers', { schema: 'public' })
export class ClaimLossTypeModifiers {
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

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(
    () => InspQuestionsLookups,
    (inspQuestionsLookups) => inspQuestionsLookups.byClaimLossModifierRef2,
  )
  inspQuestionsLookups: InspQuestionsLookups[];
}
