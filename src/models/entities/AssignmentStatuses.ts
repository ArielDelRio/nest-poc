import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Assignments } from './Assignments';

@Index('AssignmentStatuses_pkey_index', ['id'], { unique: true })
@Entity('AssignmentStatuses', { schema: 'public' })
export class AssignmentStatuses {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'code', length: 255 })
  code: string;

  @Column('character varying', { name: 'caption', length: 255 })
  caption: string;

  @Column('numeric', { name: 'percentage_of_effort' })
  percentageOfEffort: string;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Assignments, (assignments) => assignments.status)
  assignments: Assignments[];
}
