import { prismaErrorHandler } from '@helper/prisma-exception';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import { FastifyReply, FastifyRequest } from 'fastify';

type ExceptionInstance =
  | PrismaClientKnownRequestError
  | HttpException
  | PrismaClientValidationError
  | PrismaClientInitializationError
  | PrismaClientRustPanicError
  | PrismaClientUnknownRequestError
  | Error;

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: ExceptionInstance, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    let errorResponse: HttpException;

    if (exception instanceof HttpException) {
      errorResponse = exception;
    } else if (this.isPrismaError(exception)) {
      errorResponse = prismaErrorHandler(exception);
    } else if (exception instanceof Error) {
      errorResponse = new InternalServerErrorException(exception?.message ?? '');
    } else {
      errorResponse = new InternalServerErrorException();
    }

    const status = errorResponse.getStatus();

    const responseBody = errorResponse.getResponse?.();
    const message =
      responseBody && typeof responseBody === 'object' && 'message' in responseBody
        ? responseBody['message']
        : errorResponse.message;
    const errorCode =
      typeof responseBody === 'object' && 'code' in responseBody ? responseBody['code'] : '';
    this.logger.error(`${errorResponse.message} -> ${request.url}`);

    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      errorCode,
    });
  }

  isPrismaError(error: ExceptionInstance): boolean {
    return (
      error instanceof PrismaClientKnownRequestError ||
      error instanceof PrismaClientUnknownRequestError ||
      error instanceof PrismaClientValidationError ||
      error instanceof PrismaClientInitializationError ||
      error instanceof PrismaClientRustPanicError
    );
  }
}
