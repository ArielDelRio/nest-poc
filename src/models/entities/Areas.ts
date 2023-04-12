import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AreaMedias } from './AreaMedias';
import { AreaRegInformations } from './AreaRegInformations';
import { Inspections } from './Inspections';
import { InspSubjCategPairs } from './InspSubjCategPairs';

@Index('Areas_pkey_index', ['id'], { unique: true })
@Entity('Areas', { schema: 'public' })
export class Areas {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('boolean', { name: 'has_damage', default: () => 'false' })
  hasDamage: boolean;

  @Column('json', { name: 'measurements', array: true })
  measurements: object[];

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => AreaMedias, (areaMedias) => areaMedias.area)
  areaMedias: AreaMedias[];

  @OneToMany(
    () => AreaRegInformations,
    (areaRegInformations) => areaRegInformations.area,
  )
  areaRegInformations: AreaRegInformations[];

  @ManyToOne(() => Inspections, (inspections) => inspections.areas, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'inspection_id', referencedColumnName: 'id' }])
  inspection: Inspections;

  @ManyToOne(
    () => InspSubjCategPairs,
    (inspSubjCategPairs) => inspSubjCategPairs.areas,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'subject_category_pair_id', referencedColumnName: 'id' },
  ])
  subjectCategoryPair: InspSubjCategPairs;
}
