import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Gender, MemberStatus } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateMemberDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mobileNo: string;

  @ApiProperty()
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiPropertyOptional()
  @IsEnum(MemberStatus)
  @IsOptional()
  status: MemberStatus;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  joinDate: Date;
}
