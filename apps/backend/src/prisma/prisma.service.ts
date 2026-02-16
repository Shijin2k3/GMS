import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { paginationExtension } from './extension';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(config: ConfigService) {
    const connectionString = config.get<string>('DATABASE_URL') || process.env.DATABASE_URL;
    /* Create a native PG connection pool(befor prisma used hidden engine using rust it take more load
     20-30mb sometimes doesnt support in latest cloud)
    */
    const pool = new Pool({ connectionString });

    //Initialize the Prisma Adapter with the pool
    const adapter = new PrismaPg(pool);
    super({
      adapter,
    });
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
