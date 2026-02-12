import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { CreatePaymentDto } from './dto';
import { PaymentStatus } from '@prisma/client';
import { buildPrismaQueryParamsAndSort, PaginationQueryDto } from '@helper';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePaymentDto) {
    const result = await this.prisma.payment.create({
      data: {
        ...dto,
        paymentDate: dto.paymentDate ? new Date(dto.paymentDate) : new Date(),
        paymentStatus: PaymentStatus.SUCCESS,
      },
    });
    return { apiResult: result, responseMessage: 'Payment created successfully' };
  }

  async findAll(dto: PaginationQueryDto) {
    const { page, limit } = dto;
    const query = buildPrismaQueryParamsAndSort(dto);
    const [data, meta] = await this.prisma.extend.payment
      .paginate({
        ...query,
        include: {
          member: true,
        },
      })
      .withPages({ page, limit });
    return { apiResult: data, meta };
  }

  async findOne(id: string) {
    const result = await this.prisma.payment.findUnique({
      where: {
        id,
      },
      include: {
        member: true,
      },
    });

    if (!result) {
      throw new BadRequestException('Payment does not exist');
    }

    return { apiResult: result };
  }
}
