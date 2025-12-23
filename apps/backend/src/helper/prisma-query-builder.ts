import { BadRequestException } from '@nestjs/common';
import {
  PaginationQueryDto,
  PaginationQueryParamDto,
  PaginationSortDto,
} from './dto';

export type PrismaWhereQueryParams = {
  [key: string]:
    | string
    | number
    | Date
    | { in: (string | number)[] }
    | { contains: string }
    | { startsWith: string }
    | { endsWith: string }
    | { gt: string | number | Date }
    | { lt: string | number | Date }
    | { gte: string | number | Date }
    | { lte: string | number | Date }
    | { equals: string | number | Date }
    | { gte: Date; lte: Date }
    | PrismaWhereQueryParams[];
};

export type PrismaSortQuery = Array<{ [key: string]: 'asc' | 'desc' }>;

/**
 * Given a PaginationQueryDto, build a prisma query object with where and orderBy properties.
 * The where property is constructed by calling buildPrismaQueryParams on the queryParams array.
 * The orderBy property is constructed by calling buildPrismaSortQuery on the sort array.
 * If queryParams or sort are not provided, the function will return default values.
 * @param {PaginationQueryDto} dto The PaginationQueryDto object.
 * @returns {{where: PrismaWhereQueryParams, orderBy: PrismaSortQuery}} The prisma query object.
 */
export const buildPrismaQueryParamsAndSort = (
  dto: PaginationQueryDto,
  globalSearchFields?: {
    colName: string;
    matchMode?: string;
    enumValues?: string[];
  }[]
): {
  where: PrismaWhereQueryParams;
  orderBy: PrismaSortQuery;
} => {
  const {
    queryParams = [],
    sort = [{ colName: 'createdAt', sortOrder: 'DESC' }],
    page = 1,
    limit = 10,
    globalSearch,
  } = dto;

  const where = buildPrismaQueryParams(queryParams);
  const orderBy = buildPrismaSortQuery(sort);

  if (globalSearch && globalSearchFields?.length) {
    const OR: PrismaWhereQueryParams[] = [];
    for (const field of globalSearchFields) {
      const { colName, matchMode, enumValues } = field;
      let condition = buildPrismaMatchModeCondition(
        colName,
        globalSearch,
        matchMode,
        enumValues
      );
      if (condition) {
        OR.push(condition);
      }
    }
    // Merge into existing OR
    if (where.OR) {
      where.OR = [...(where.OR as PrismaWhereQueryParams[]), ...OR];
    } else {
      where.OR = OR;
    }
  }

  return { where, orderBy };
};

export const buildPrismaQueryParams = (
  filterParams: PaginationQueryParamDto[]
): PrismaWhereQueryParams => {
  const AND: PrismaWhereQueryParams[] = [];
  const OR: PrismaWhereQueryParams[] = [];

  if (Array.isArray(filterParams) && filterParams.length) {
    for (const param of filterParams) {
      const { colName, value, matchMode, type, operation } = param;
      let condition: PrismaWhereQueryParams;

      if (type === 'DATE' && value) {
        condition = buildPrismaDateCondition(colName, value);
      } else if (Array.isArray(value)) {
        condition = { [colName]: { in: value } };
      } else {
        condition = buildPrismaMatchModeCondition(colName, value, matchMode);
      }

      if (condition) {
        if (operation === 'OR') {
          OR.push(condition);
        } else {
          AND.push(condition);
        }
      }
    }
  }

  const where: PrismaWhereQueryParams = {};
  if (AND.length) where.AND = AND;
  if (OR.length) where.OR = OR;

  return where;
};

export const buildPrismaSortQuery = (
  sortParams: PaginationSortDto[]
): PrismaSortQuery => {
  const orderBy: PrismaSortQuery = [];

  if (Array.isArray(sortParams) && sortParams.length) {
    for (const param of sortParams) {
      const { colName, sortOrder } = param;
      orderBy.push({ [colName]: sortOrder.toLowerCase() as 'asc' | 'desc' }); // 'asc' | 'desc'
    }
  }

  return orderBy;
};

const buildPrismaMatchModeCondition = (
  colName: string,
  value: string | number,
  matchMode?: string,
  enumValues?: string[]
): PrismaWhereQueryParams => {
  if (typeof value === 'string') {
    value = value.trim();
    // Auto-cast numeric strings to numbers
    if (/^\d+$/.test(value)) {
      value = Number(value);
    }
  }

  if (enumValues && typeof value === 'string') {
    // Filter enum values for partial match
    const matches = enumValues.filter((val) =>
      val.toLowerCase().includes(value.toLowerCase())
    );
    if (matches.length) return { [colName]: { in: matches } };
    return null;
  }

  switch (matchMode) {
    case 'contains':
      return { [colName]: { contains: value as string } };
    case 'startsWith':
      return {
        [colName]: { startsWith: value as string },
      };

    case 'endsWith':
      return { [colName]: { endsWith: value as string } };

    case 'gt':
      return { [colName]: { gt: value } };

    case 'lt':
      return { [colName]: { lt: value } };

    case 'gte':
      return { [colName]: { gte: value } };

    case 'lte':
      return { [colName]: { lte: value } };

    case 'equals':
    default:
      return { [colName]: { equals: value } };
  }
};

const buildPrismaDateCondition = (
  colName: string,
  value: string | number
): PrismaWhereQueryParams => {
  const dateValue = new Date(value);
  if (isNaN(dateValue.getTime())) {
    throw new BadRequestException(`Invalid date format: ${value}`);
  }

  const startOfDay = new Date(dateValue);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(dateValue);
  endOfDay.setHours(23, 59, 59, 999);

  return {
    [colName]: {
      gte: startOfDay,
      lte: endOfDay,
    },
  };
};
