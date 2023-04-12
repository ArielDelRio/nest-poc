import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('all_open_claims_pkey_index', ['id'], { unique: true })
@Entity('all_open_claims', { schema: 'public' })
export class AllOpenClaims {
  @Column('character varying', { name: 'loc_id', nullable: true, length: 50 })
  locId: string | null;

  @Column('character varying', {
    name: 'desk_adjuster',
    nullable: true,
    length: 255,
  })
  deskAdjuster: string | null;

  @Column('character varying', {
    name: 'inspector',
    nullable: true,
    length: 255,
  })
  inspector: string | null;

  @Column('character varying', { name: 'insured', nullable: true, length: 255 })
  insured: string | null;

  @Column('character varying', {
    name: 'insured_phone',
    nullable: true,
    length: 50,
  })
  insuredPhone: string | null;

  @Column('character varying', {
    name: 'carrier_claim_number',
    nullable: true,
    length: 50,
  })
  carrierClaimNumber: string | null;

  @Column('character varying', {
    name: 'policy_number',
    nullable: true,
    length: 50,
  })
  policyNumber: string | null;

  @Column('character varying', {
    name: 'risk_address_1',
    nullable: true,
    length: 255,
  })
  riskAddress_1: string | null;

  @Column('character varying', {
    name: 'risk_city',
    nullable: true,
    length: 255,
  })
  riskCity: string | null;

  @Column('character varying', { name: 'risk_zip', nullable: true, length: 50 })
  riskZip: string | null;

  @Column('character varying', {
    name: 'ni_contacted',
    nullable: true,
    length: 50,
  })
  niContacted: string | null;

  @Column('character varying', {
    name: 'ni_contact_next_action',
    nullable: true,
    length: 50,
  })
  niContactNextAction: string | null;

  @Column('character varying', {
    name: 'ni_contacted_date',
    nullable: true,
    length: 50,
  })
  niContactedDate: string | null;

  @Column('character varying', {
    name: 'inspection_scheduled',
    nullable: true,
    length: 50,
  })
  inspectionScheduled: string | null;

  @Column('character varying', {
    name: 'inspection_scheduled_next_action',
    nullable: true,
    length: 50,
  })
  inspectionScheduledNextAction: string | null;

  @Column('character varying', {
    name: 'inspection_scheduled_date',
    nullable: true,
    length: 50,
  })
  inspectionScheduledDate: string | null;

  @Column('character varying', {
    name: 'inspection_uploaded',
    nullable: true,
    length: 50,
  })
  inspectionUploaded: string | null;

  @Column('text', { name: 'inspection_notes', nullable: true })
  inspectionNotes: string | null;

  @Column('text', { name: 'ni_contacted_note', nullable: true })
  niContactedNote: string | null;

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;
}
