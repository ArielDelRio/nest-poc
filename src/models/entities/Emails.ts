import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contacts } from './Contacts';

@Index('Emails_pkey_index', ['id'], { unique: true })
@Entity('Emails', { schema: 'public' })
export class Emails {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'caption', nullable: true, length: 255 })
  caption: string | null;

  @Column('enum', { name: 'type', enum: ['WORK', 'PERSONAL'] })
  type: 'WORK' | 'PERSONAL';

  @Column('character varying', { name: 'email', length: 255 })
  email: string;

  @Column('boolean', { name: 'primary' })
  primary: boolean;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Contacts, (contacts) => contacts.emails, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'contact_id', referencedColumnName: 'id' }])
  contact: Contacts;
}
