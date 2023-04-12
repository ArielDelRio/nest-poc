import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Carriers } from './Carriers';
import { LineOfBusinesses } from './LineOfBusinesses';

@Index('CarrierLineOfBusiness_pkey_index', ['carrierId', 'lineOfBusinessId'], {
  unique: true,
})
@Entity('CarrierLineOfBusiness', { schema: 'public' })
export class CarrierLineOfBusiness {
  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('integer', { primary: true, name: 'carrier_id' })
  carrierId: number;

  @Column('integer', { primary: true, name: 'line_of_business_id' })
  lineOfBusinessId: number;

  @ManyToOne(() => Carriers, (carriers) => carriers.carrierLineOfBusinesses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'carrier_id', referencedColumnName: 'id' }])
  carrier: Carriers;

  @ManyToOne(
    () => LineOfBusinesses,
    (lineOfBusinesses) => lineOfBusinesses.carrierLineOfBusinesses,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'line_of_business_id', referencedColumnName: 'id' }])
  lineOfBusiness: LineOfBusinesses;
}
