import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FormatQueryFilterInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest(),
      query = request.query;
    if (query.queryParams) {
      query.queryParams = this.formatParams(query.queryParams);
    }
    if (query.sort) {
      query.sort = this.formatParams(query.sort);
    }
    return next.handle();
  }

  formatParams(params: string) {
    if (typeof params === 'string') {
      try {
        const formattedQueryParams = params
          .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3')
          .replace(/'/g, '"');

        params = JSON.parse(formattedQueryParams);
        return params;
      } catch (error) {
        throw new HttpException(
          'Invalid queryParams format',
          HttpStatus.BAD_REQUEST
        );
      }
    }
  }
}
