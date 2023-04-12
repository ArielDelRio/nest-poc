import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserLanguages } from './UserLanguages';

@Index('Languages_pkey_index', ['id'], { unique: true })
@Entity('Languages', { schema: 'public' })
export class Languages {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @Column('character varying', { name: 'caption', length: 255 })
  caption: string;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => UserLanguages, (userLanguages) => userLanguages.language)
  userLanguages: UserLanguages[];
}
