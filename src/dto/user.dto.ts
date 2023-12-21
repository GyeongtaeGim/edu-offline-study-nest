import { IsEmail, Length, MaxLength } from 'class-validator';
import UserEntity from 'entity/user.entity';

export class User {
  id: string;
  username: string;
  createdDate: Date;
  updatedDate: Date;

  constructor(data: UserEntity) {
    this.id = data.id;
    this.username = data.username;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}

export class CreateUserRequest {
  @IsEmail()
  @MaxLength(64)
  username: string;

  @Length(8, 32)
  password: string;
}

export class CreateUserResponse extends User {}
