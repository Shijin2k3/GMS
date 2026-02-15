import { MatchModeEnum } from '@enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional()
  limit?: number = 10;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  globalSearch?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaginationQueryParamDto)
  @ApiPropertyOptional()
  queryParams?: PaginationQueryParamDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaginationSortDto)
  @ApiPropertyOptional()
  sort?: PaginationSortDto[];
}

export class PaginationQueryParamDto {
  @IsString()
  @ApiProperty()
  colName: string;

  @IsOptional()
  @ApiPropertyOptional()
  value: string | number;

  @IsOptional()
  @IsEnum(MatchModeEnum)
  @ApiPropertyOptional({
    description: 'Match modes for filtering',
    enum: MatchModeEnum,
  })
  matchMode?: MatchModeEnum = MatchModeEnum.CONTAINS;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  type?: string | 'DATE';

  @IsOptional()
  @IsIn(['AND', 'OR'])
  @ApiPropertyOptional({
    description: 'AND: all conditions must match, OR: at least one condition must match',
  })
  operation?: 'AND' | 'OR';
}

export class PaginationSortDto {
  @IsString()
  @ApiProperty()
  colName: string;

  @IsIn(['ASC', 'DESC'])
  @ApiProperty()
  sortOrder: 'ASC' | 'DESC';
}
