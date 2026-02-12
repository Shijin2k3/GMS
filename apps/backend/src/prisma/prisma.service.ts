import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { paginationExtension } from './extension';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(config: ConfigService) {
    const url = config.get<string>('DATABASE_URL') || process.env.DATABASE_URL;
    super({
      datasources: {
        db: {
          url,
        },
      },
    } as any);
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  get extend() {
    return this.$extends(paginationExtension);
  }
}
