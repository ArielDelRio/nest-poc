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

@Index('Messages_pkey_index', ['id'], { unique: true })
@Entity('Messages', { schema: 'public' })
export class Messages {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'sid', length: 255 })
  sid: string;

  @Column('character varying', { name: 'phone_number', length: 255 })
  phoneNumber: string;

  @Column('uuid', { name: 'bulk_id', nullable: true })
  bulkId: string | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @ManyToOne(() => Conversations, (conversations) => conversations.messages, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'conversation_id', referencedColumnName: 'id' }])
  conversation: Conversations;

  @ManyToOne(() => Contacts, (contacts) => contacts.messages, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'owner_contact_id', referencedColumnName: 'id' }])
  ownerContact: Contacts;
}
