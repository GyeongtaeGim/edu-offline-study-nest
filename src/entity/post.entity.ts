import createId from 'common/createId';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import UserEntity from './user.entity';

@Entity()
export default class PostEntity extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 16 })
  id: string = createId();

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.posts, { eager: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: UserEntity;

  @Column()
  createdById: UserEntity['id'];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
