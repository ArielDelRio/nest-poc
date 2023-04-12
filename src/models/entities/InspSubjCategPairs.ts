import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Areas } from './Areas';
import { InspSubjCategories } from './InspSubjCategories';
import { InspSubjects } from './InspSubjects';

@Index('InspSubjCategPairs_pkey_index', ['id'], { unique: true })
@Index('InspSubjCategPairs_unique_pair_index', ['subCategoryId', 'subjectId'], {
  unique: true,
})
@Entity('InspSubjCategPairs', { schema: 'public' })
export class InspSubjCategPairs {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

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

  @Column('integer', { name: 'subject_id', nullable: true })
  subjectId: number | null;

  @Column('integer', { name: 'sub_category_id', nullable: true })
  subCategoryId: number | null;

  @OneToMany(() => Areas, (areas) => areas.subjectCategoryPair)
  areas: Areas[];

  @ManyToOne(
    () => InspSubjCategories,
    (inspSubjCategories) => inspSubjCategories.inspSubjCategPairs,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'sub_category_id', referencedColumnName: 'id' }])
  subCategory: InspSubjCategories;

  @ManyToOne(
    () => InspSubjects,
    (inspSubjects) => inspSubjects.inspSubjCategPairs,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'subject_id', referencedColumnName: 'id' }])
  subject: InspSubjects;
}
