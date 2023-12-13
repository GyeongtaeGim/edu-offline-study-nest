import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import PostEntity from 'entity/post.entity';
import PostService from './post.service';
import PostController from './post.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostService],
  controllers: [PostController],
  exports: [],
})
export class PostModule {}
