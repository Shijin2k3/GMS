import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { CreateMemberDto, UpdateMemberDto } from './dto';
import { buildPrismaQueryParamsAndSort, PaginationQueryDto } from '@helper';
import { MemberStatus } from '@prisma/client';

@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMemberDto) {
    const result = await this.prisma.member.create({
      data: { ...dto, status: MemberStatus.ACTIVE },
    });
    return { apiResult: result, responseMessage: 'New Member Created successfully' };
  }

  async findOne(id: string) {
    const member = await this.prisma.member.findUnique({
      where: { id },
      include: {
        payments: true,
      },
    });

    if (!member) {
      throw new BadRequestException('Member does not Exist');
    }

    return { apiResult: member };
  }

  async findAll(dto: PaginationQueryDto) {
    const { page, limit } = dto;
    const query = buildPrismaQueryParamsAndSort(dto);
    const [data, meta] = await this.prisma.extend.member.paginate(query).withPages({ page, limit });
    return { data, meta };
  }

  async update(id: string, dto: UpdateMemberDto) {
    const existingMember = await this.prisma.member.findUnique({
      where: { id },
    });

    if (!existingMember) {
      throw new BadRequestException('Member does not exist');
    }

    const member = await this.prisma.member.update({
      where: { id },
      data: dto,
    });

    return { apiResult: member, responseMessage: 'Member Updated successfully' };
  }

  async delete(id: string) {
    const existingMember = await this.prisma.member.findUnique({
      where: { id },
    });

    if (!existingMember) {
      throw new BadRequestException('Member does not exist');
    }

    const member = await this.prisma.member.update({
      where: { id },
      data: { status: MemberStatus.INACTIVE, deletedAt: new Date() },
    });

    return { apiResult: member, responseMessage: 'Member Deleted successfully' };
  }

  async active(id: string) {
    const existingMember = await this.prisma.member.findUnique({
      where: { id },
    });

    if (!existingMember) {
      throw new BadRequestException('Member does not exist');
    }

    const member = await this.prisma.member.update({
      where: { id },
      data: { status: MemberStatus.ACTIVE, deletedAt: null },
    });

    return { apiResult: member, responseMessage: 'Member Activated successfully' };
  }
}
