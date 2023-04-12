import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Tasks } from './Tasks';

@Index('TaskDeliverables_pkey_index', ['deliverableId', 'taskId'], {
  unique: true,
})
@Entity('TaskDeliverables', { schema: 'public' })
export class TaskDeliverables {
  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('integer', { primary: true, name: 'deliverable_id' })
  deliverableId: number;

  @Column('integer', { primary: true, name: 'task_id' })
  taskId: number;

  @ManyToOne(() => Tasks, (tasks) => tasks.taskDeliverables, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'task_id', referencedColumnName: 'id' }])
  task: Tasks;
}
