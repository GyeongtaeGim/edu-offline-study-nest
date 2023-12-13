import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { IsEmail, Length, MaxLength } from 'class-validator';
import { comparePassword, createHashedPassword } from 'common/cipher';
import { AleadyExistError } from 'common/error';
import UserEntity from 'entity/user.entity';
import { Repository } from 'typeorm';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(64)
  username: string;

  @Length(8, 32)
  password: string;
}

export class LoginDto {
  @IsEmail()
  @MaxLength(64)
  username: string;

  @Length(8, 32)
  password: string;
}

@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(UserEntity) private users: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async createUser(body: CreateUserDto) {
    if (await this.users.exist({ where: { username: body.username } })) throw new AleadyExistError('사용자가 이미 존재합니다.');

    const { salt, password } = await createHashedPassword(body.password);
    return this.users
      .create({
        username: body.username,
        password,
        salt,
      })
      .save();
  }

  async validateUser(body: LoginDto) {
    const user = await this.users.findOneBy({ username: body.username });
    if (!user || !(await comparePassword(body.password, user.password, user.salt))) return null;
    return user;
  }

  async login(user: UserEntity) {
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
