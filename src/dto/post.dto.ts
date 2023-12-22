import { IsOptional, MinLength } from 'class-validator';
import { User } from './user.dto';
import PostEntity from 'entity/post.entity';

export class Post {
  id: string;
  title: string;
  content: string;
  createdBy: User;

  constructor(data: PostEntity) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    if (data.createdBy) {
      this.createdBy = new User(data.createdBy);
    }
  }
}

export class PostResponse extends Post {}

export class CreatePostRequest {
  @MinLength(4)
  title: string;

  @MinLength(0)
  content: string;
}

export class CreatePostResponse extends Post {}

export class UpdatePostRequest {
  @MinLength(4)
  @IsOptional()
  title?: string;

  @MinLength(0)
  @IsOptional()
  content?: string;
}

export class UpdatePostResponse extends Post {}
