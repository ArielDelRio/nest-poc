import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Notes } from './Notes';
import { Conversations } from './Conversations';

@Index('VoiceCalls_pkey_index', ['id'], { unique: true })
@Index('VoiceCalls_sid_key_index', ['sid'], { unique: true })
@Entity('VoiceCalls', { schema: 'public' })
export class VoiceCalls {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'sid', unique: true, length: 255 })
  sid: string;

  @Column('character varying', { name: 'from', length: 255 })
  from: string;

  @Column('character varying', { name: 'to', length: 255 })
  to: string;

  @Column('character varying', { name: 'direction', length: 255 })
  direction: string;

  @Column('character varying', { name: 'status', length: 255 })
  status: string;

  @Column('integer', { name: 'duration', nullable: true })
  duration: number | null;

  @Column('enum', {
    name: 'merge_status',
    enum: [
      'QUEUED',
      'HOLD',
      'IN_PROGRESS',
      'RECORDING',
      'COMPLETED',
      'NOT_PROCESSED',
    ],
  })
  mergeStatus:
    | 'QUEUED'
    | 'HOLD'
    | 'IN_PROGRESS'
    | 'RECORDING'
    | 'COMPLETED'
    | 'NOT_PROCESSED';

  @Column('timestamp with time zone', { name: 'status_updated_at' })
  statusUpdatedAt: Date;

  @Column('enum', {
    name: 'recording_type',
    nullable: true,
    enum: ['CALL', 'VOICEMAIL'],
  })
  recordingType: 'CALL' | 'VOICEMAIL' | null;

  @Column('character varying', {
    name: 'recording_url',
    nullable: true,
    length: 255,
  })
  recordingUrl: string | null;

  @Column('character varying', {
    name: 'recording_sid',
    nullable: true,
    length: 255,
  })
  recordingSid: string | null;

  @Column('integer', { name: 'recording_duration', nullable: true })
  recordingDuration: number | null;

  @Column('character varying', {
    name: 'api_version',
    nullable: true,
    length: 255,
  })
  apiVersion: string | null;

  @Column('character varying', {
    name: 'caller_name',
    nullable: true,
    length: 255,
  })
  callerName: string | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('integer', { name: 'attendant_contact_id', nullable: true })
  attendantContactId: number | null;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @OneToMany(() => Notes, (notes) => notes.voiceCall)
  notes: Notes[];

  @ManyToOne(() => Conversations, (conversations) => conversations.voiceCalls, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'conversation_id', referencedColumnName: 'id' }])
  conversation: Conversations;
}
