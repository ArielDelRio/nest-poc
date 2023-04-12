import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Areas } from './Areas';
import { InspQuestions } from './InspQuestions';

@Index('AreaRegInformations_pkey_index', ['areaId', 'inspQuestionId'], {
  unique: true,
})
@Entity('AreaRegInformations', { schema: 'public' })
export class AreaRegInformations {
  @Column('text', { name: 'answer', nullable: true })
  answer: string | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('integer', { primary: true, name: 'area_id' })
  areaId: number;

  @Column('integer', { primary: true, name: 'insp_question_id' })
  inspQuestionId: number;

  @ManyToOne(() => Areas, (areas) => areas.areaRegInformations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'area_id', referencedColumnName: 'id' }])
  area: Areas;

  @ManyToOne(
    () => InspQuestions,
    (inspQuestions) => inspQuestions.areaRegInformations,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'insp_question_id', referencedColumnName: 'id' }])
  inspQuestion: InspQuestions;
}
