import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Businesses } from './Businesses';
import { Contacts } from './Contacts';

@Index('BusinessContacts_pkey_index', ['businessId', 'contactId'], {
  unique: true,
})
@Entity('BusinessContacts', { schema: 'public' })
export class BusinessContacts {
  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('integer', { primary: true, name: 'business_id' })
  businessId: number;

  @Column('integer', { primary: true, name: 'contact_id' })
  contactId: number;

  @ManyToOne(() => Businesses, (businesses) => businesses.businessContacts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'business_id', referencedColumnName: 'id' }])
  business: Businesses;

  @ManyToOne(() => Contacts, (contacts) => contacts.businessContacts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'contact_id', referencedColumnName: 'id' }])
  contact: Contacts;
}
