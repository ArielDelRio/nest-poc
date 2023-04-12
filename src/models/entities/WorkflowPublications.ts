import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Works } from './Works';

@Index('WorkflowPublications_pkey_index', ['id'], { unique: true })
@Entity('WorkflowPublications', { schema: 'public' })
export class WorkflowPublications {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('jsonb', { name: 'data', nullable: true })
  data: object | null;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Works, (works) => works.workflowPublications, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'task_work_id', referencedColumnName: 'id' }])
  taskWork: Works;

  @OneToMany(() => Works, (works) => works.assignmentWorkflowPub)
  works: Works[];
}
