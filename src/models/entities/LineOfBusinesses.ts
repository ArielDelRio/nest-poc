import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarrierLineOfBusiness } from './CarrierLineOfBusiness';
import { CarrierProcessFlowScenarios } from './CarrierProcessFlowScenarios';
import { Claims } from './Claims';
import { DeductibleCodes } from './DeductibleCodes';
import { InspQuestionsLookups } from './InspQuestionsLookups';
import { LobCoverages } from './LobCoverages';
import { PolicyTypes } from './PolicyTypes';
import { Stages } from './Stages';

@Index('LineOfBusinesses_pkey_index', ['id'], { unique: true })
@Entity('LineOfBusinesses', { schema: 'public' })
export class LineOfBusinesses {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'caption', length: 255 })
  caption: string;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(
    () => CarrierLineOfBusiness,
    (carrierLineOfBusiness) => carrierLineOfBusiness.lineOfBusiness,
  )
  carrierLineOfBusinesses: CarrierLineOfBusiness[];

  @OneToMany(
    () => CarrierProcessFlowScenarios,
    (carrierProcessFlowScenarios) => carrierProcessFlowScenarios.carrierLob,
  )
  carrierProcessFlowScenarios: CarrierProcessFlowScenarios[];

  @OneToMany(() => Claims, (claims) => claims.lineOfBusiness)
  claims: Claims[];

  @OneToMany(
    () => DeductibleCodes,
    (deductibleCodes) => deductibleCodes.lineOfBusiness,
  )
  deductibleCodes: DeductibleCodes[];

  @OneToMany(
    () => InspQuestionsLookups,
    (inspQuestionsLookups) => inspQuestionsLookups.byLineOfBusinessRef2,
  )
  inspQuestionsLookups: InspQuestionsLookups[];

  @OneToMany(() => LobCoverages, (lobCoverages) => lobCoverages.lineOfBusiness)
  lobCoverages: LobCoverages[];

  @OneToMany(() => PolicyTypes, (policyTypes) => policyTypes.lineOfBusiness)
  policyTypes: PolicyTypes[];

  @OneToMany(() => Stages, (stages) => stages.lineOfBusiness)
  stages: Stages[];
}
