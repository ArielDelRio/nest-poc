import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConversationContacts } from './ConversationContacts';
import { Claims } from './Claims';
import { Contacts } from './Contacts';
import { Messages } from './Messages';
import { VideoRooms } from './VideoRooms';
import { VoiceCalls } from './VoiceCalls';

@Index('Conversations_pkey_index', ['id'], { unique: true })
@Entity('Conversations', { schema: 'public' })
export class Conversations {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', {
    name: 'phone_number',
    nullable: true,
    length: 255,
  })
  phoneNumber: string | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('boolean', {
    name: 'is_external',
    nullable: true,
    default: () => 'false',
  })
  isExternal: boolean | null;

  @OneToMany(
    () => ConversationContacts,
    (conversationContacts) => conversationContacts.conversation,
  )
  conversationContacts: ConversationContacts[];

  @ManyToOne(() => Claims, (claims) => claims.conversations, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'claim_id', referencedColumnName: 'id' }])
  claim: Claims;

  @ManyToOne(() => Contacts, (contacts) => contacts.conversations, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'owner_contact_id', referencedColumnName: 'id' }])
  ownerContact: Contacts;

  @OneToMany(() => Messages, (messages) => messages.conversation)
  messages: Messages[];

  @OneToMany(() => VideoRooms, (videoRooms) => videoRooms.conversation)
  videoRooms: VideoRooms[];

  @OneToMany(() => VoiceCalls, (voiceCalls) => voiceCalls.conversation)
  voiceCalls: VoiceCalls[];
}
