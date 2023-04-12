import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarrierAssignmentTypeModifiers } from './CarrierAssignmentTypeModifiers';

@Index('AssignmentTypeModifiers_code_key_index', ['code'], { unique: true })
@Index('AssignmentTypeModifiers_pkey_index', ['id'], { unique: true })
@Index('AssignmentTypeModifiers_name_key_index', ['name'], { unique: true })
@Entity('AssignmentTypeModifiers', { schema: 'public' })
export class AssignmentTypeModifiers {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'code', unique: true, length: 255 })
  code: string;

  @Column('character varying', { name: 'name', unique: true, length: 255 })
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
    () => CarrierAssignmentTypeModifiers,
    (carrierAssignmentTypeModifiers) =>
      carrierAssignmentTypeModifiers.typeModifierEntity,
  )
  carrierAssignmentTypeModifiers: CarrierAssignmentTypeModifiers[];
}
