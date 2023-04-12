import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Languages } from './Languages';
import { Users } from './Users';

@Index('UserLanguages_pkey_index', ['languageId', 'userId'], { unique: true })
@Entity('UserLanguages', { schema: 'public' })
export class UserLanguages {
  @Column('boolean', { name: 'primary', default: () => 'true' })
  primary: boolean;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('integer', { primary: true, name: 'user_id' })
  userId: number;

  @Column('integer', { primary: true, name: 'language_id' })
  languageId: number;

  @ManyToOne(() => Languages, (languages) => languages.userLanguages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'language_id', referencedColumnName: 'id' }])
  language: Languages;

  @ManyToOne(() => Users, (users) => users.userLanguages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
