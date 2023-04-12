import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Claims } from './Claims';
import { LineOfBusinesses } from './LineOfBusinesses';

@Index('PolicyTypes_caption_key_index', ['caption'], { unique: true })
@Index('PolicyTypes_pkey_index', ['id'], { unique: true })
@Entity('PolicyTypes', { schema: 'public' })
export class PolicyTypes {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @Column('character varying', { name: 'caption', unique: true, length: 255 })
  caption: string;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 255,
  })
  description: string | null;

  @Column('jsonb', { name: 'reserve_template', nullable: true })
  reserveTemplate: object | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Claims, (claims) => claims.policyType)
  claims: Claims[];

  @ManyToOne(
    () => LineOfBusinesses,
    (lineOfBusinesses) => lineOfBusinesses.policyTypes,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'line_of_business_id', referencedColumnName: 'id' }])
  lineOfBusiness: LineOfBusinesses;
}
