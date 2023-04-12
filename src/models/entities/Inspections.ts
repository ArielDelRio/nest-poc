import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Areas } from './Areas';
import { Users } from './Users';
import { Claims } from './Claims';
import { InspectionTypes } from './InspectionTypes';

@Index('Inspections_pkey_index_index', ['id'], { unique: true })
@Entity('Inspections', { schema: 'public' })
export class Inspections {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('enum', {
    name: 'version',
    enum: ['Preliminary', 'Interim', 'Final', 'Supplemental'],
  })
  version: 'Preliminary' | 'Interim' | 'Final' | 'Supplemental';

  @Column('enum', { name: 'status', enum: ['Draft', 'Published'] })
  status: 'Draft' | 'Published';

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Areas, (areas) => areas.inspection)
  areas: Areas[];

  @ManyToOne(() => Users, (users) => users.inspections, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'author_user_id', referencedColumnName: 'id' }])
  authorUser: Users;

  @ManyToOne(() => Claims, (claims) => claims.inspections, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'claim_id', referencedColumnName: 'id' }])
  claim: Claims;

  @ManyToOne(
    () => InspectionTypes,
    (inspectionTypes) => inspectionTypes.inspections,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'type_id', referencedColumnName: 'id' }])
  type: InspectionTypes;
}
