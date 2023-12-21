import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import createId from 'common/createId';
import PostEntity from './post.entity';
import { Exclude } from 'class-transformer';

@Entity()
export default class UserEntity extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 16 })
  id: string = createId();

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => PostEntity, (post) => post.createdBy)
  posts: Promise<PostEntity[]>;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
