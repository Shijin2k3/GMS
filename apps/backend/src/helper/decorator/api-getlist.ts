import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiPaginationQuery } from './api-pagination-query';

export function ApiGetList(paginated = false) {
  const summary = paginated ? 'Get paginated list' : 'Get full list';
  return applyDecorators(ApiOperation({ summary }), ...(paginated ? [ApiPaginationQuery()] : []));
}
