import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import PostService from './post.service';
import AccessTokenGuard from 'auth/access-token.guard';
import {
  CreatePostRequest,
  CreatePostResponse,
  PostResponse,
  UpdatePostRequest,
  UpdatePostResponse,
} from '../dto/post.dto';

@Controller('/post')
export default class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async getPost(@Request() req) {
    const data = await this.postService.get(req.user.id);
    return data.map((v) => new PostResponse(v));
  }

  @UseGuards(AccessTokenGuard)
  @Get(':postId')
  async getPostById(@Param('postId') postId: string) {
    return new PostResponse(await this.postService.getById(postId));
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  async createPost(@Request() req, @Body() body: CreatePostRequest) {
    return new CreatePostResponse(await this.postService.create(req.user.id, body));
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':postId')
  async updatePost(
    @Request() req,
    @Param('postId') postId: string,
    @Body() body: UpdatePostRequest,
  ) {
    return new UpdatePostResponse(await this.postService.update(req.user.id, postId, body));
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':postId')
  async deletePost(@Request() req, @Param('postId') postId: string) {
    return this.postService.delete(req.user.id, postId);
  }
}
