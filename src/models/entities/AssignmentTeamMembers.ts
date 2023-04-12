import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Assignments } from './Assignments';
import { Contacts } from './Contacts';
import { Works } from './Works';

@Index('AssignmentTeamMembers_pkey_index', ['id'], { unique: true })
@Entity('AssignmentTeamMembers', { schema: 'public' })
export class AssignmentTeamMembers {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(
    () => Assignments,
    (assignments) => assignments.assignmentTeamMembers,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'assignment_id', referencedColumnName: 'id' }])
  assignment: Assignments;

  @ManyToOne(() => Contacts, (contacts) => contacts.assignmentTeamMembers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'contact_id', referencedColumnName: 'id' }])
  contact: Contacts;

  @OneToMany(() => Works, (works) => works.teamMember)
  works: Works[];
}
