import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import AuthService, { CreateUserDto } from './auth.service';
import { AleadyExistError } from 'common/error';
import LocalAuthGuard from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('/auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('join')
  async createUser(@Body() body: CreateUserDto) {
    return this.authService.createUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
