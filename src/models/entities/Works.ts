import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkflowPublications } from './WorkflowPublications';
import { Assignments } from './Assignments';
import { Users } from './Users';
import { Claims } from './Claims';
import { TaskStatuses } from './TaskStatuses';
import { Tasks } from './Tasks';
import { AssignmentTeamMembers } from './AssignmentTeamMembers';

@Index('Works_pkey_index', ['id'], { unique: true })
@Entity('Works', { schema: 'public' })
export class Works {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', { name: 'checked', nullable: true })
  checked: boolean | null;

  @Column('text', { name: 'note', nullable: true })
  note: string | null;

  @Column('boolean', { name: 'active', nullable: true })
  active: boolean | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('timestamp with time zone', {
    name: 'scheduled_date',
    nullable: true,
  })
  scheduledDate: Date | null;

  @Column('jsonb', { name: 'last_known_location', nullable: true })
  lastKnownLocation: object | null;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @OneToMany(
    () => WorkflowPublications,
    (workflowPublications) => workflowPublications.taskWork,
  )
  workflowPublications: WorkflowPublications[];

  @ManyToOne(() => Assignments, (assignments) => assignments.works, {
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'assignment_id', referencedColumnName: 'id' }])
  assignment: Assignments;

  @ManyToOne(() => Users, (users) => users.works, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'assignment_user_id', referencedColumnName: 'id' }])
  assignmentUser: Users;

  @ManyToOne(
    () => WorkflowPublications,
    (workflowPublications) => workflowPublications.works,
    { onDelete: 'SET NULL' },
  )
  @JoinColumn([
    { name: 'assignment_workflow_pub_id', referencedColumnName: 'id' },
  ])
  assignmentWorkflowPub: WorkflowPublications;

  @ManyToOne(() => Claims, (claims) => claims.works, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'claim_id', referencedColumnName: 'id' }])
  claim: Claims;

  @ManyToOne(() => TaskStatuses, (taskStatuses) => taskStatuses.works, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'status_id', referencedColumnName: 'id' }])
  status: TaskStatuses;

  @ManyToOne(() => Tasks, (tasks) => tasks.works, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'task_id', referencedColumnName: 'id' }])
  task: Tasks;

  @ManyToOne(
    () => AssignmentTeamMembers,
    (assignmentTeamMembers) => assignmentTeamMembers.works,
    { onDelete: 'SET NULL' },
  )
  @JoinColumn([{ name: 'team_member_id', referencedColumnName: 'id' }])
  teamMember: AssignmentTeamMembers;
}
