import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatuses } from './TaskStatuses';
import { TaskActions } from './TaskActions';

@Index('TaskStatusTransitions_pkey_index', ['id'], { unique: true })
@Entity('TaskStatusTransitions', { schema: 'public' })
export class TaskStatusTransitions {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('integer', { name: 'seq', nullable: true, default: () => '0' })
  seq: number | null;

  @ManyToOne(
    () => TaskStatuses,
    (taskStatuses) => taskStatuses.taskStatusTransitions,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'initial_status_id', referencedColumnName: 'id' }])
  initialStatus: TaskStatuses;

  @ManyToOne(
    () => TaskStatuses,
    (taskStatuses) => taskStatuses.taskStatusTransitions2,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'next_status_id', referencedColumnName: 'id' }])
  nextStatus: TaskStatuses;

  @ManyToOne(
    () => TaskActions,
    (taskActions) => taskActions.taskStatusTransitions,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'on_action_id', referencedColumnName: 'id' }])
  onAction: TaskActions;
}
