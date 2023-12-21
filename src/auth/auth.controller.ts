import { Body, Controller, Get, Post, Req, Res, UseGuards, Request } from '@nestjs/common';
import AuthService from './auth.service';
import LocalAuthGuard from './local-auth.guard';
import AccessTokenGuard from './access-token.guard';
import { FastifyReply } from 'fastify';
import RefreshTokenGuard from './refresh-token.guard';
import { CreateUserRequest, CreateUserResponse, User } from 'dto/user.dto';

@Controller('/auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post('join')
  async createUser(@Body() body: CreateUserRequest) {
    return new CreateUserResponse(await this.authService.createUser(body));
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res() res: FastifyReply) {
    const token = await this.authService.generateTokens(req.user.id, req.user.username);
    res.setCookie('access_token', token.accessToken, { secure: false, httpOnly: false });
    res.setCookie('refresh_token', token.refreshToken, { httpOnly: true, secure: true });
    res.send(new User(req.user));
    return;
  }

  @Post('logout')
  async logout(@Res() res: FastifyReply) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return;
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refresh(@Req() req, @Res() res: FastifyReply) {
    const token = await this.authService.refreshTokens(req.user.id);
    res.setCookie('access_token', token.accessToken, { secure: false, httpOnly: false });
    res.setCookie('refresh_token', token.refreshToken, { httpOnly: true, secure: true });
    res.send();
    return;
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return new User(req.user);
  }
}
