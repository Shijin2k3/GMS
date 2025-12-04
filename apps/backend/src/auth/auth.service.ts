import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { LoginDto, SignUpDto } from './dto';
import { UserStatus } from '@prisma/client';
import { hashPassword } from '@helper/utils';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

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

  async login(dto: LoginDto) {}
}
