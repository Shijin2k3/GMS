import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    return next.handle().pipe(
      map((data) => {
        /* Extract custom response fields from controller output
         responseMessage => custom message for API response, defaults to 'Success'
         apiResult =>custom main payload of the response (object or array)
        */

        const {
          responseMessage = 'Success',
          apiResult,
          ...resultData
        } = data || {};

        const result =
          apiResult !== undefined
            ? apiResult
            : Array.isArray(data)
            ? data
            : resultData || {};

        return {
          status: response.statusCode,
          result: result,
          message: responseMessage,
        };
      })
    );
  }
}
