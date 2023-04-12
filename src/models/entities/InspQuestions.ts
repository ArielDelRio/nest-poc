import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AreaRegInformations } from './AreaRegInformations';
import { InspQuestionGroups } from './InspQuestionGroups';

@Index('InspQuestions_pkey_index', ['id'], { unique: true })
@Entity('InspQuestions', { schema: 'public' })
export class InspQuestions {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @Column('character varying', { name: 'question', length: 255 })
  question: string;

  @Column('boolean', { name: 'is_required', default: () => 'true' })
  isRequired: boolean;

  @Column('enum', {
    name: 'answer_type',
    enum: [
      'SINGLE_CHOICE',
      'MULTIPLE_CHOICE',
      'SINGLE_TEXT_LINE',
      'MULTIPLE_TEXT_LINE',
    ],
  })
  answerType:
    | 'SINGLE_CHOICE'
    | 'MULTIPLE_CHOICE'
    | 'SINGLE_TEXT_LINE'
    | 'MULTIPLE_TEXT_LINE';

  @Column('jsonb', { name: 'answer_options', nullable: true })
  answerOptions: object | null;

  @Column('jsonb', { name: 'default_answer', nullable: true })
  defaultAnswer: object | null;

  @Column('jsonb', { name: 'answer_assertion', nullable: true })
  answerAssertion: object | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(
    () => AreaRegInformations,
    (areaRegInformations) => areaRegInformations.inspQuestion,
  )
  areaRegInformations: AreaRegInformations[];

  @ManyToOne(
    () => InspQuestionGroups,
    (inspQuestionGroups) => inspQuestionGroups.inspQuestions,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'question_group_id', referencedColumnName: 'id' }])
  questionGroup: InspQuestionGroups;
}
