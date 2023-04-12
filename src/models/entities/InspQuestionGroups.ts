import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InspQuestions } from './InspQuestions';
import { InspQuestionsLookups } from './InspQuestionsLookups';

@Index('InspQuestionGroups_pkey_index', ['id'], { unique: true })
@Entity('InspQuestionGroups', { schema: 'public' })
export class InspQuestionGroups {
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
    () => InspQuestions,
    (inspQuestions) => inspQuestions.questionGroup,
  )
  inspQuestions: InspQuestions[];

  @OneToMany(
    () => InspQuestionsLookups,
    (inspQuestionsLookups) => inspQuestionsLookups.inspQuestionGroup,
  )
  inspQuestionsLookups: InspQuestionsLookups[];
}
