import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'common/error';
import PostEntity from 'entity/post.entity';
import UserEntity from 'entity/user.entity';
import { Repository } from 'typeorm';
import { CreatePostRequest, UpdatePostRequest } from '../dto/post.dto';

@Injectable()
export default class PostService {
  constructor(@InjectRepository(PostEntity) private posts: Repository<PostEntity>) {}

  async get(userId: UserEntity['id']) {
    return await this.posts.findBy({ createdById: userId });
  }

  async getById(postId: PostEntity['id']) {
    return await this.posts.findOneBy({ id: postId });
  }

  async create(userId: UserEntity['id'], body: CreatePostRequest) {
    const { id } = await this.posts
      .create({
        ...body,
        createdById: userId,
      })
      .save();
    return await this.posts.findOneBy({ id });
  }

  async update(userId: UserEntity['id'], postId: PostEntity['id'], body: UpdatePostRequest) {
    const posts = await this.posts.findOneBy({ id: postId });
    if (!posts) throw new NotFoundError();
    if (posts.createdById !== userId) throw new ForbiddenException();
    await this.posts.save({ id: postId, ...body });
    await posts.reload();
    return posts;
  }

  async delete(userId: UserEntity['id'], postId: PostEntity['id']) {
    const posts = await this.posts.findOneBy({ id: postId });
    if (!posts) throw new NotFoundError();
    if (posts.createdById !== userId) throw new ForbiddenException();
    return await this.posts.delete(postId);
  }
}
