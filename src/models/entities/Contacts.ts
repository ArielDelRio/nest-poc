import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AssignmentTeamMembers } from './AssignmentTeamMembers';
import { Assignments } from './Assignments';
import { BusinessContacts } from './BusinessContacts';
import { Businesses } from './Businesses';
import { Carriers } from './Carriers';
import { ClaimContacts } from './ClaimContacts';
import { Users } from './Users';
import { ConversationContacts } from './ConversationContacts';
import { Conversations } from './Conversations';
import { Emails } from './Emails';
import { Messages } from './Messages';
import { Phones } from './Phones';
import { Vendors } from './Vendors';
import { VideoRooms } from './VideoRooms';

@Index('Contacts_pkey_index', ['id'], { unique: true })
@Entity('Contacts', { schema: 'public' })
export class Contacts {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 255,
  })
  description: string | null;

  @Column('boolean', {
    name: 'insured',
    nullable: true,
    default: () => 'false',
  })
  insured: boolean | null;

  @Column('boolean', {
    name: 'primary',
    nullable: true,
    default: () => 'false',
  })
  primary: boolean | null;

  @Column('jsonb', { name: 'contact_points', nullable: true })
  contactPoints: object | null;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('character varying', {
    name: 'full_name',
    nullable: true,
    length: 255,
  })
  fullName: string | null;

  @Column('enum', {
    name: 'type',
    enum: [
      'Insured',
      'Additional Insured',
      'Family Member',
      'Claimant',
      'Agent',
      'Mortgage',
      'Lienholder',
      'Public Adjuster',
      'Power of Attorney',
      'Attorney',
      'TPA Representative',
      'Umpire',
      'Opposing Appraiser',
      'Other',
    ],
    default: 'Other',
  })
  type:
    | 'Insured'
    | 'Additional Insured'
    | 'Family Member'
    | 'Claimant'
    | 'Agent'
    | 'Mortgage'
    | 'Lienholder'
    | 'Public Adjuster'
    | 'Power of Attorney'
    | 'Attorney'
    | 'TPA Representative'
    | 'Umpire'
    | 'Opposing Appraiser'
    | 'Other';

  @OneToMany(
    () => AssignmentTeamMembers,
    (assignmentTeamMembers) => assignmentTeamMembers.contact,
  )
  assignmentTeamMembers: AssignmentTeamMembers[];

  @OneToMany(
    () => Assignments,
    (assignments) => assignments.assignedOrganization,
  )
  assignments: Assignments[];

  @OneToMany(
    () => Assignments,
    (assignments) => assignments.assignerOrganization,
  )
  assignments2: Assignments[];

  @OneToMany(
    () => BusinessContacts,
    (businessContacts) => businessContacts.contact,
  )
  businessContacts: BusinessContacts[];

  @OneToMany(() => Businesses, (businesses) => businesses.contact)
  businesses: Businesses[];

  @OneToMany(() => Carriers, (carriers) => carriers.contact)
  carriers: Carriers[];

  @OneToOne(() => ClaimContacts, (claimContacts) => claimContacts.contact)
  claimContacts: ClaimContacts;

  @ManyToOne(() => Users, (users) => users.contacts, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @OneToMany(
    () => ConversationContacts,
    (conversationContacts) => conversationContacts.contact,
  )
  conversationContacts: ConversationContacts[];

  @OneToMany(() => Conversations, (conversations) => conversations.ownerContact)
  conversations: Conversations[];

  @OneToMany(() => Emails, (emails) => emails.contact)
  emails: Emails[];

  @OneToMany(() => Messages, (messages) => messages.ownerContact)
  messages: Messages[];

  @OneToMany(() => Phones, (phones) => phones.contact)
  phones: Phones[];

  @OneToMany(() => Vendors, (vendors) => vendors.contact)
  vendors: Vendors[];

  @OneToMany(() => VideoRooms, (videoRooms) => videoRooms.ownerContact)
  videoRooms: VideoRooms[];
}
