import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import AuthService from './auth.service';
import AuthController from './auth.controller';
import LocalStrategy from './local.strategy';
import UserEntity from 'entity/user.entity';

import AccessTokenStrategy from './access-token.strategy';
import RefreshTokenStrategy from './refresh-token.strategy';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule, JwtModule],
  providers: [AuthService, LocalStrategy, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
