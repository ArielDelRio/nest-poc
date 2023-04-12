import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InspQuestionsLookups } from './InspQuestionsLookups';
import { InspSubjCategPairs } from './InspSubjCategPairs';

@Index('InspSubjects_pkey_index', ['id'], { unique: true })
@Index('InspSubjects_title_key_index', ['title'], { unique: true })
@Entity('InspSubjects', { schema: 'public' })
export class InspSubjects {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'title', unique: true, length: 255 })
  title: string;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 255,
  })
  description: string | null;

  @Column('boolean', { name: 'may_have_measurements', default: () => 'true' })
  mayHaveMeasurements: boolean;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @Column('integer', { name: 'order', default: () => '0' })
  order: number;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(
    () => InspQuestionsLookups,
    (inspQuestionsLookups) => inspQuestionsLookups.byInspSubjectRef2,
  )
  inspQuestionsLookups: InspQuestionsLookups[];

  @OneToMany(
    () => InspSubjCategPairs,
    (inspSubjCategPairs) => inspSubjCategPairs.subject,
  )
  inspSubjCategPairs: InspSubjCategPairs[];
}
