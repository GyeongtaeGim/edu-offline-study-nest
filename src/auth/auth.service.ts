import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword, createHashedPassword } from 'common/cipher';
import { LoginRequest } from 'dto/auth.dto';
import { CreateUserRequest } from 'dto/user.dto';
import UserEntity from 'entity/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(UserEntity) private users: Repository<UserEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createUser(body: CreateUserRequest) {
    if (await this.users.exist({ where: { username: body.username } })) throw new BadRequestException({ code: 'aleady_exist' });

    const { salt, password } = await createHashedPassword(body.password);
    return this.users
      .create({
        username: body.username,
        password,
        salt,
      })
      .save();
  }

  async validateUser(body: LoginRequest) {
    const user = await this.users.findOneBy({ username: body.username });
    if (!user || !(await comparePassword(body.password, user.password, user.salt))) return null;
    return { id: user.id, username: user.username };
  }

  async login(user: UserEntity) {
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: 60 * 3,
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: 24 * 60 * 60,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string) {
    const user = await this.users.findOneBy({ id: userId });

    if (!user) throw new ForbiddenException();

    return await this.generateTokens(user.id, user.username);
  }
}
