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
    return await this.posts.find({ where: { createdById: userId }, relations: { createdBy: true } });
  }

  async getById(postId: PostEntity['id']) {
    return await this.posts.findOne({ where: { id: postId }, relations: ['createdBy'] });
  }

  async create(userId: UserEntity['id'], body: CreatePostRequest) {
    return await this.posts
      .create({
        ...body,
        createdById: userId,
      })
      .save();
  }

  async update(userId: UserEntity['id'], postId: PostEntity['id'], body: UpdatePostRequest) {
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
