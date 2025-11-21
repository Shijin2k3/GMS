import { Prisma } from '@prisma/client';
import { createPaginator } from 'prisma-extension-pagination';

const paginate = createPaginator({
  pages: {
    limit: 10,
    includePageCount: true,
  },
});

export const paginationExtension = Prisma.defineExtension({
  name: 'pagination-extension',
  model: {
    $allModels: {
      paginate,
    },
  },
});
