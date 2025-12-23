import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FastifyRequest } from 'fastify';
import { PrismaService } from '@prisma';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('ACCESS_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: FastifyRequest, payload: any) {
    const user = await this.prisma.users.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
