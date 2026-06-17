import { TokenType } from '@enums';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategyService extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('REFRESH_TOKEN_SECRET'),
    });
  }

  async validate(payload: any) {
    //validate refresh token
    if (payload.tokenType !== TokenType.REFRESH_TOKEN) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
