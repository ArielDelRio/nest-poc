import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './Flavor';

@Entity('coffee', { schema: 'public' })
export class Coffee {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('character varying', { name: 'description', nullable: true })
  description: string | null;

  @Column('character varying', { name: 'brand' })
  brand: string;

  @Column('integer', { name: 'recommendations', default: () => '0' })
  recommendations: number;

  @ManyToMany(() => Flavor, (flavor) => flavor.coffees)
  @JoinTable({
    name: 'coffee_flavors_flavor',
    joinColumns: [{ name: 'coffeeId', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'flavorId', referencedColumnName: 'id' }],
    schema: 'public',
  })
  flavors: Flavor[];
}
