import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contacts } from './Contacts';
import { Properties } from './Properties';

@Index('Phones_pkey_index', ['id'], { unique: true })
@Entity('Phones', { schema: 'public' })
export class Phones {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('enum', {
    name: 'type',
    nullable: true,
    enum: ['WORK', 'PERSONAL', 'HOME'],
  })
  type: 'WORK' | 'PERSONAL' | 'HOME' | null;

  @Column('boolean', { name: 'sms_capable', default: () => 'false' })
  smsCapable: boolean;

  @Column('character varying', { name: 'country_code', length: 255 })
  countryCode: string;

  @Column('character varying', { name: 'phone_number', length: 255 })
  phoneNumber: string;

  @Column('integer', { name: 'ext', nullable: true })
  ext: number | null;

  @Column('character varying', {
    name: 'vanity_number',
    nullable: true,
    length: 255,
  })
  vanityNumber: string | null;

  @Column('character varying', { name: 'caption', nullable: true, length: 255 })
  caption: string | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @ManyToOne(() => Contacts, (contacts) => contacts.phones, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'contact_id', referencedColumnName: 'id' }])
  contact: Contacts;

  @OneToMany(() => Properties, (properties) => properties.phone)
  properties: Properties[];
}
