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

@Index('DeductibleCodes_pkey_index', ['id'], { unique: true })
@Entity('DeductibleCodes', { schema: 'public' })
export class DeductibleCodes {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @Column('character varying', { name: 'caption', length: 255 })
  caption: string;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 255,
  })
  description: string | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Claims, (claims) => claims.deductibleCode)
  claims: Claims[];

  @ManyToOne(
    () => LineOfBusinesses,
    (lineOfBusinesses) => lineOfBusinesses.deductibleCodes,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'line_of_business_id', referencedColumnName: 'id' }])
  lineOfBusiness: LineOfBusinesses;
}
