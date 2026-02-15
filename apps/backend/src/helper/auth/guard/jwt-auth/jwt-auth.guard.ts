import { IS_PUBLIC_KEY, PublicConditionFn } from '@helper';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) as PublicConditionFn | boolean | undefined;
    const req = context.switchToHttp().getRequest<FastifyRequest>();

    if (isPublic === true) return true;

    if (isPublic && typeof isPublic === 'function') {
      const result = isPublic(req);
      if (result) return true;
    }

    return super.canActivate(context);
  }
}
