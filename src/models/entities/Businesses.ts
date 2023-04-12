import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BusinessContacts } from './BusinessContacts';
import { Contacts } from './Contacts';

@Index('Businesses_pkey_index', ['id'], { unique: true })
@Entity('Businesses', { schema: 'public' })
export class Businesses {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('jsonb', { name: 'tags', nullable: true })
  tags: object | null;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('character varying', { name: 'legal_name', length: 255 })
  legalName: string;

  @Column('character varying', {
    name: 'alternative_name',
    nullable: true,
    length: 255,
  })
  alternativeName: string | null;

  @Column('character varying', { name: 'sites', nullable: true, length: 255 })
  sites: string | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(
    () => BusinessContacts,
    (businessContacts) => businessContacts.business,
  )
  businessContacts: BusinessContacts[];

  @ManyToOne(() => Contacts, (contacts) => contacts.businesses, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'contact_id', referencedColumnName: 'id' }])
  contact: Contacts;
}
