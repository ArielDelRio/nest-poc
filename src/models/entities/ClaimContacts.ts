import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Claims } from './Claims';
import { Contacts } from './Contacts';

@Index('ClaimContacts_pkey_index', ['claimId', 'contactId'], { unique: true })
@Index('ClaimContacts_contact_id_index', ['contactId'], { unique: true })
@Entity('ClaimContacts', { schema: 'public' })
export class ClaimContacts {
  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('integer', { primary: true, name: 'claim_id' })
  claimId: number;

  @Column('integer', { primary: true, name: 'contact_id' })
  contactId: number;

  @ManyToOne(() => Claims, (claims) => claims.claimContacts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'claim_id', referencedColumnName: 'id' }])
  claim: Claims;

  @OneToOne(() => Contacts, (contacts) => contacts.claimContacts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'contact_id', referencedColumnName: 'id' }])
  contact: Contacts;
}
