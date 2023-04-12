import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatusTransitions } from './TaskStatusTransitions';
import { Works } from './Works';

@Index('TaskStatuses_pkey_index', ['id'], { unique: true })
@Entity('TaskStatuses', { schema: 'public' })
export class TaskStatuses {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

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

  @OneToMany(
    () => TaskStatusTransitions,
    (taskStatusTransitions) => taskStatusTransitions.initialStatus,
  )
  taskStatusTransitions: TaskStatusTransitions[];

  @OneToMany(
    () => TaskStatusTransitions,
    (taskStatusTransitions) => taskStatusTransitions.nextStatus,
  )
  taskStatusTransitions2: TaskStatusTransitions[];

  @OneToMany(() => Works, (works) => works.status)
  works: Works[];
}
