import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Claims } from './Claims';
import { VoiceCalls } from './VoiceCalls';

@Index('Notes_pkey_index', ['id'], { unique: true })
@Entity('Notes', { schema: 'public' })
export class Notes {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'title', length: 255 })
  title: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('boolean', { name: 'sticky', default: () => 'false' })
  sticky: boolean;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @ManyToOne(() => Claims, (claims) => claims.notes, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'claim_id', referencedColumnName: 'id' }])
  claim: Claims;

  @ManyToOne(() => VoiceCalls, (voiceCalls) => voiceCalls.notes, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'voice_call_id', referencedColumnName: 'id' }])
  voiceCall: VoiceCalls;
}
