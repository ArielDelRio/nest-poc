import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('IDX_b535fbe8ec6d832dde22065ebd', ['name'], {})
@Entity('event', { schema: 'public' })
export class Event {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'type' })
  type: string;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('json', { name: 'payload' })
  payload: object;
}
