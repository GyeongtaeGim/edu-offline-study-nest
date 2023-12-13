import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import PostService, { CreatePostDto, UpdatePostDto } from './post.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@Controller('/post')
export default class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getPost() {
    return this.postService.get();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':postId')
  async getPostById(@Param('postId') postId: string) {
    return this.postService.getById(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Request() req, @Body() body: CreatePostDto) {
    return this.postService.create(req.user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':postId')
  async updatePost(@Request() req, @Param('postId') postId: string, @Body() body: UpdatePostDto) {
    return this.postService.update(req.user, postId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  async deletePost(@Request() req, @Param('postId') postId: string) {
    return this.postService.delete(req.user, postId);
  }
}
