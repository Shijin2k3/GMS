import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto';
import { ApiPublic, JwtAuthRefreshGuard } from '@helper';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiPublic()
  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @ApiPublic()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @ApiPublic()
  @UseGuards(JwtAuthRefreshGuard)
  @ApiBearerAuth()
  refreshToken(@Req() req: any) {
    return this.authService.refreshToken(req.user.userId);
  }
}
