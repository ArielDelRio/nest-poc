import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskDeliverables } from './TaskDeliverables';
import { Stages } from './Stages';
import { Works } from './Works';

@Index('Tasks_pkey_index', ['id'], { unique: true })
@Entity('Tasks', { schema: 'public' })
export class Tasks {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'caption', length: 255 })
  caption: string;

  @Column('varchar', { name: 'coverage', nullable: true, array: true })
  coverage: string[] | null;

  @Column('boolean', { name: 'assignable' })
  assignable: boolean;

  @Column('integer', { name: 'seq' })
  seq: number;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('character varying', {
    name: 'hasWorkflow',
    nullable: true,
    length: 255,
  })
  hasWorkflow: string | null;

  @Column('varchar', { name: 'type', nullable: true, array: true })
  type: string[] | null;

  @Column('numeric', {
    name: 'percentage_of_effort',
    nullable: true,
    default: () => '0',
  })
  percentageOfEffort: string | null;

  @OneToMany(
    () => TaskDeliverables,
    (taskDeliverables) => taskDeliverables.task,
  )
  taskDeliverables: TaskDeliverables[];

  @ManyToOne(() => Stages, (stages) => stages.tasks, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'stage_id', referencedColumnName: 'id' }])
  stage: Stages;

  @OneToMany(() => Works, (works) => works.task)
  works: Works[];
}
