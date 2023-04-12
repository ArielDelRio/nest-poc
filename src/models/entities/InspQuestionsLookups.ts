import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carriers } from './Carriers';
import { ClaimLossTypeModifiers } from './ClaimLossTypeModifiers';
import { ClaimLossTypes } from './ClaimLossTypes';
import { InspSubjCategories } from './InspSubjCategories';
import { InspSubjects } from './InspSubjects';
import { LineOfBusinesses } from './LineOfBusinesses';
import { InspQuestionGroups } from './InspQuestionGroups';

@Index(
  'InspQuestionsLookups_unique_refers_index',
  [
    'byCarrierRef',
    'byCatastropheFlag',
    'byClaimLossModifierRef',
    'byClaimLossTypeRef',
    'byInspSubCategoryRef',
    'byInspSubjectRef',
    'byLineOfBusinessRef',
    'inspQuestionGroupId',
  ],
  { unique: true },
)
@Index('InspQuestionsLookups_pkey_index', ['id'], { unique: true })
@Entity('InspQuestionsLookups', { schema: 'public' })
export class InspQuestionsLookups {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', { name: 'by_catastrophe_flag', nullable: true })
  byCatastropheFlag: boolean | null;

  @Column('boolean', { name: 'is_optional', default: () => 'false' })
  isOptional: boolean;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('integer', { name: 'insp_question_group_id', nullable: true })
  inspQuestionGroupId: number | null;

  @Column('integer', { name: 'by_carrier_ref', nullable: true })
  byCarrierRef: number | null;

  @Column('integer', { name: 'by_line_of_business_ref', nullable: true })
  byLineOfBusinessRef: number | null;

  @Column('integer', { name: 'by_claim_loss_type_ref', nullable: true })
  byClaimLossTypeRef: number | null;

  @Column('integer', { name: 'by_claim_loss_modifier_ref', nullable: true })
  byClaimLossModifierRef: number | null;

  @Column('integer', { name: 'by_insp_subject_ref', nullable: true })
  byInspSubjectRef: number | null;

  @Column('integer', { name: 'by_insp_sub_category_ref', nullable: true })
  byInspSubCategoryRef: number | null;

  @ManyToOne(() => Carriers, (carriers) => carriers.inspQuestionsLookups, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'by_carrier_ref', referencedColumnName: 'id' }])
  byCarrierRef2: Carriers;

  @ManyToOne(
    () => ClaimLossTypeModifiers,
    (claimLossTypeModifiers) => claimLossTypeModifiers.inspQuestionsLookups,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'by_claim_loss_modifier_ref', referencedColumnName: 'id' },
  ])
  byClaimLossModifierRef2: ClaimLossTypeModifiers;

  @ManyToOne(
    () => ClaimLossTypes,
    (claimLossTypes) => claimLossTypes.inspQuestionsLookups,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'by_claim_loss_type_ref', referencedColumnName: 'id' }])
  byClaimLossTypeRef2: ClaimLossTypes;

  @ManyToOne(
    () => InspSubjCategories,
    (inspSubjCategories) => inspSubjCategories.inspQuestionsLookups,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'by_insp_sub_category_ref', referencedColumnName: 'id' },
  ])
  byInspSubCategoryRef2: InspSubjCategories;

  @ManyToOne(
    () => InspSubjects,
    (inspSubjects) => inspSubjects.inspQuestionsLookups,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'by_insp_subject_ref', referencedColumnName: 'id' }])
  byInspSubjectRef2: InspSubjects;

  @ManyToOne(
    () => LineOfBusinesses,
    (lineOfBusinesses) => lineOfBusinesses.inspQuestionsLookups,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'by_line_of_business_ref', referencedColumnName: 'id' }])
  byLineOfBusinessRef2: LineOfBusinesses;

  @ManyToOne(
    () => InspQuestionGroups,
    (inspQuestionGroups) => inspQuestionGroups.inspQuestionsLookups,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'insp_question_group_id', referencedColumnName: 'id' }])
  inspQuestionGroup: InspQuestionGroups;
}
