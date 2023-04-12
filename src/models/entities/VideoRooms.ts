import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversations } from './Conversations';
import { Contacts } from './Contacts';

@Index('VideoRooms_pkey_index', ['id'], { unique: true })
@Entity('VideoRooms', { schema: 'public' })
export class VideoRooms {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'sid', length: 255 })
  sid: string;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('character varying', { name: 'status', length: 255 })
  status: string;

  @Column('integer', { name: 'duration', nullable: true })
  duration: number | null;

  @Column('timestamp with time zone', { name: 'end_time', nullable: true })
  endTime: Date | null;

  @Column('character varying', {
    name: 'composition_sid',
    nullable: true,
    length: 255,
  })
  compositionSid: string | null;

  @Column('character varying', {
    name: 'composition_url',
    nullable: true,
    length: 255,
  })
  compositionUrl: string | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Conversations, (conversations) => conversations.videoRooms, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'conversation_id', referencedColumnName: 'id' }])
  conversation: Conversations;

  @ManyToOne(() => Contacts, (contacts) => contacts.videoRooms, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'owner_contact_id', referencedColumnName: 'id' }])
  ownerContact: Contacts;
}
