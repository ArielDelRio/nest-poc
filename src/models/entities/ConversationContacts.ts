import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Contacts } from './Contacts';
import { Conversations } from './Conversations';

@Index('ConversationContacts_pkey_index', ['contactId', 'conversationId'], {
  unique: true,
})
@Entity('ConversationContacts', { schema: 'public' })
export class ConversationContacts {
  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('integer', { primary: true, name: 'conversation_id' })
  conversationId: number;

  @Column('integer', { primary: true, name: 'contact_id' })
  contactId: number;

  @ManyToOne(() => Contacts, (contacts) => contacts.conversationContacts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'contact_id', referencedColumnName: 'id' }])
  contact: Contacts;

  @ManyToOne(
    () => Conversations,
    (conversations) => conversations.conversationContacts,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'conversation_id', referencedColumnName: 'id' }])
  conversation: Conversations;
}
