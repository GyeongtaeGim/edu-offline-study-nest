import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MinLength } from 'class-validator';
import { NotFoundError } from 'common/error';
import PostEntity from 'entity/post.entity';
import UserEntity from 'entity/user.entity';
import { Repository } from 'typeorm';

export class CreatePostDto {
  @MinLength(4)
  title: string;

  @MinLength(0)
  content: string;
}

export class UpdatePostDto {
  @MinLength(4)
  title: string;

  @MinLength(0)
  content: string;
}

@Injectable()
export default class PostService {
  constructor(@InjectRepository(PostEntity) private posts: Repository<PostEntity>) {}

  async get() {
    return await this.posts.find();
  }

  async getById(postId: PostEntity['id']) {
    return await this.posts.findOneBy({ id: postId });
  }

  async create(userId: UserEntity['id'], body: CreatePostDto) {
    return await this.posts
      .create({
        ...body,
        createdById: userId,
      })
      .save();
  }

  async update(userId: UserEntity['id'], postId: PostEntity['id'], body: UpdatePostDto) {
    const posts = await this.posts.findOneBy({ id: postId });
    if (!posts) throw new NotFoundError();
    if (posts.createdById !== userId) throw new ForbiddenException();
    return await this.posts.save({ id: postId, ...body });
  }

  async delete(userId: UserEntity['id'], postId: PostEntity['id']) {
    const posts = await this.posts.findOneBy({ id: postId });
    if (!posts) throw new NotFoundError();
    if (posts.createdById !== userId) throw new ForbiddenException();
    return await this.posts.delete(postId);
  }
}
