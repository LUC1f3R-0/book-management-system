import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto, LoginDto, LogoutDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async createUser(@Body() body: RegisterDto) {
    const user = await this.authService.registerUser(body);
    return {
      message: 'User registered successfully',
      user,
    };
  }

  @Post('login')
  async loginUser(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(body);

    // httpOnly secure cookies
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return { message: 'Login successful' };
  }

  @Post('refresh')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken: string = req.cookies?.refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token found');
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshTokens(refreshToken);

    // Set new tokens as cookies
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return { message: 'Tokens refreshed successfully' };
  }

  @Post('logout')
  async logout(
    @Body() body: LogoutDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(body.email);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return { message: 'Logout successful' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/dashboard')
  getProfile(@Req() req: Request) {
    return { user: req.user };
  }
}
