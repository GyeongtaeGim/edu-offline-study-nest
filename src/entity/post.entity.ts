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

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'createdById' })
  createdBy: Promise<UserEntity>;

  @Column()
  createdById: UserEntity['id'];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
