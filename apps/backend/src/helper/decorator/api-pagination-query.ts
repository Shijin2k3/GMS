import { FormatQueryFilterInterceptor } from '@helper';
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiPaginationQuery() {
  return applyDecorators(
    UseInterceptors(FormatQueryFilterInterceptor),
    ApiQuery({ name: 'page', type: Number, required: false }),
    ApiQuery({ name: 'limit', type: Number, required: false }),
    ApiQuery({
      name: 'queryParams',
      type: String,
      required: false,
      example: '[{"colName":"name","value":"education"}]',
      description: `Filter conditions as JSON string. Example: [{"colName":"name","value":"education",matchMode:"equals"}]`,
    }),
    ApiQuery({
      name: 'sort',
      type: String,
      required: false,
      example: '[{"colName":"name","sortOrder":"ASC"}]',
      description: `Sort conditions as JSON string. Example: [{"colName":"created_at","sortOrder":"DESC"}]`,
    }),
    ApiQuery({
      name: 'globalSearch',
      type: String,
      required: false,
      description: 'Search across beneficiaryName, beneficiaryEmail, country, etc.',
      example: 'david',
    })
  );
}
