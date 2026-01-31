import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateMemberDto, UpdateMemberDto } from './dto';
import { MemberService } from './member.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiGetList, PaginationQueryDto } from '@helper';

@ApiBearerAuth()
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  create(@Body() dto: CreateMemberDto) {
    return this.memberService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(id);
  }

  @Get()
  @ApiGetList(true)
  findAll(@Query() query: PaginationQueryDto) {
    return this.memberService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMemberDto) {
    return this.memberService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.memberService.delete(id);
  }

  @Patch(':id/active')
  active(@Param('id') id: string) {
    return this.memberService.active(id);
  }
}
