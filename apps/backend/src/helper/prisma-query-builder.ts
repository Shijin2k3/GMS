import { BadRequestException } from '@nestjs/common';
import { PaginationQueryDto, PaginationQueryParamDto, PaginationSortDto } from './dto';

export type PrismaWhereQueryParams = {
  [key: string]:
    | string
    | number
    | Date
    | { in: (string | number)[] }
    | { notIn: (string | number)[] }
    | { contains: string }
    | { startsWith: string }
    | { endsWith: string }
    | { gt: string | number | Date }
    | { lt: string | number | Date }
    | { gte: string | number | Date }
    | { lte: string | number | Date }
    | { equals: string | number | Date }
    | { gte: Date; lte: Date }
    | PrismaWhereQueryParams[]
    | PrismaWhereQueryParams;
};

export type PrismaSortQuery = Array<{ [key: string]: 'asc' | 'desc' }>;

/**
 * NEW HELPER: Recursive Object Builder
 * Injected into existing functions to handle "a.b.c" paths.
 */
const createNestedObject = (path: string, value: any): PrismaWhereQueryParams => {
  const parts = path.split('.');
  const root: Record<string, any> = {};
  let current = root;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (i === parts.length - 1) {
      current[part] = value;
    } else {
      current[part] = current[part] || {};
      current = current[part];
    }
  }
  return root;
};

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
  }[],
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
      let condition = buildPrismaMatchModeCondition(colName, globalSearch, matchMode, enumValues);
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
  filterParams: PaginationQueryParamDto[],
): PrismaWhereQueryParams => {
  const AND: PrismaWhereQueryParams[] = [];
  const OR: PrismaWhereQueryParams[] = [];

  if (Array.isArray(filterParams) && filterParams.length) {
    for (const param of filterParams) {
      const { colName, value, matchMode, type, operation } = param;
      let condition: PrismaWhereQueryParams | null = null;

      if (type === 'DATE' && value) {
        condition = buildPrismaDateCondition(colName, value);
      } else if (Array.isArray(value)) {
        condition = createNestedObject(colName, { in: value });
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

export const buildPrismaSortQuery = (sortParams: PaginationSortDto[]): PrismaSortQuery => {
  const orderBy: PrismaSortQuery = [];

  if (Array.isArray(sortParams) && sortParams.length) {
    for (const param of sortParams) {
      const { colName, sortOrder } = param;
      // Stripping .some/.every for sorting as Prisma doesn't support them in orderBy
      const cleanPath = colName.replace(/\.(some|every|none)\./g, '.');
      orderBy.push(createNestedObject(cleanPath, sortOrder.toLowerCase() as 'asc' | 'desc') as any); // 'asc' | 'desc'
    }
  }

  return orderBy;
};

const buildPrismaMatchModeCondition = (
  colName: string,
  value: string | number,
  matchMode?: string,
  enumValues?: string[],
): PrismaWhereQueryParams => {
  let processedValue = value;

  if (typeof processedValue === 'string') {
    processedValue = processedValue.trim();
    const isStringSearch = ['contains', 'startsWith', 'endsWith'].includes(matchMode || '');
    if (!isStringSearch && /^-?\d*\.?\d+$/.test(processedValue)) {
      processedValue = Number(processedValue);
    }
  }

  if (enumValues && typeof processedValue === 'string') {
    // Filter enum values for partial match
    const matches = enumValues.filter((val) =>
      val.toLowerCase().includes((processedValue as string).toLowerCase()),
    );
    if (matches.length) return createNestedObject(colName, { in: matches });
    return null;
  }

  let leafCondition: any;
  switch (matchMode) {
    case 'contains':
      leafCondition = { contains: processedValue as string };
      break;
    case 'startsWith':
      leafCondition = { startsWith: processedValue as string };
      break;
    case 'endsWith':
      leafCondition = { endsWith: processedValue as string };
      break;
    case 'gt':
      leafCondition = { gt: processedValue };
      break;
    case 'lt':
      leafCondition = { lt: processedValue };
      break;
    case 'gte':
      leafCondition = { gte: processedValue };
      break;
    case 'lte':
      leafCondition = { lte: processedValue };
      break;
    case 'isNotNull':
      leafCondition = { not: null };
      break;
    case 'isNull':
      leafCondition = { equals: null };
      break;
    default:
      leafCondition = { equals: processedValue };
  }

  return createNestedObject(colName, leafCondition);
};

const buildPrismaDateCondition = (
  colName: string,
  value: string | number,
): PrismaWhereQueryParams => {
  const dateValue = new Date(value);
  if (isNaN(dateValue.getTime())) {
    throw new BadRequestException(`Invalid date format: ${value}`);
  }

  const startOfDay = new Date(dateValue);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(dateValue);
  endOfDay.setHours(23, 59, 59, 999);

  return createNestedObject(colName, { gte: startOfDay, lte: endOfDay });
};
