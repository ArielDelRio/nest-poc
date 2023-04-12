import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('TMP_layout_s_pkey_1_index', ['id'], { unique: true })
@Entity('TMP_layout_s', { schema: 'public' })
export class TmpLayoutS {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'merge_id', nullable: true })
  mergeId: number | null;

  @Column('integer', { name: 'group_id', nullable: true })
  groupId: number | null;

  @Column('jsonb', { name: 'meta', nullable: true })
  meta: object | null;
}
