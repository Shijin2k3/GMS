import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { LoginDto, SignUpDto } from './dto';
import { UserStatus } from '@prisma/client';
import { hashPassword, verifyPassword } from '@helper/utils';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenType } from '@enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService
  ) {}

  async signup(dto: SignUpDto) {
    const { password, ...rest } = dto;
    const existingUser = await this.prisma.users.findUnique({
      where: { email: dto.email, deletedAt: null, status: UserStatus.ACTIVE },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists with this email');
    }

    const hashedPassword = await hashPassword(password);

    const result = await this.prisma.users.create({
      data: { ...rest, password: hashedPassword },
      omit: { password: true },
    });

    return { apiResult: result };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.users.findUnique({
      where: { email: dto.email, deletedAt: null, status: UserStatus.ACTIVE },
    });

    if (!user) {
      throw new UnauthorizedException('User not found with this email');
    }

    const { password, createdAt, deletedAt, updatedAt, ...rest } = user;

    const isValidPassword = await verifyPassword(dto.password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokens = await this.getTokens(rest.userId, rest.email);

    return {
      apiResult: { ...tokens, user: rest },
      responseMessage: 'Login Successfully',
    };
  }

  async refreshToken(userId: string) {
    const user = await this.prisma.users.findUnique({
      where: { userId },
      select: {
        email: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    const { refreshToken, accessToken } = await this.getTokens(userId, user?.email);

    return {
      refreshToken,
      accessToken,
    };
  }

  private async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId: userId,
          email: email,
          tokenType: TokenType.ACCESS_TOKEN,
        },
        {
          expiresIn: Number(this.config.get<number>('ACCESS_TOKEN_EXPIRY')) || 86400,
          secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
        }
      ),
      this.jwtService.signAsync(
        {
          userId: userId,
          email: email,
          tokenType: TokenType.REFRESH_TOKEN,
        },
        {
          expiresIn: Number(this.config.get<number>('REFRESH_TOKEN_EXPIRY')) || 2592000,
          secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
        }
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
