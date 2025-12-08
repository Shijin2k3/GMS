import { SetMetadata } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
export type PublicConditionFn = (req: FastifyRequest) => boolean;
export const IS_PUBLIC_KEY = 'isPublic';

export const ApiPublic = (dynamicFn?: PublicConditionFn) =>
  SetMetadata(IS_PUBLIC_KEY, dynamicFn ?? true);
