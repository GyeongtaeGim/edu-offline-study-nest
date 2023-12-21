import { IsEmail, Length, MaxLength } from 'class-validator';

export class LoginRequest {
  @IsEmail()
  @MaxLength(64)
  username: string;

  @Length(8, 32)
  password: string;
}
