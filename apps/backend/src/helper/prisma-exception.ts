import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

export function prismaErrorHandler(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2000':
        return new BadRequestException('Input value is too long.');
      case 'P2002':
        return new ConflictException(
          `Unique constraint failed on the field(s): ${error.meta?.target}`
        );
      case 'P2003':
        return new BadRequestException('Foreign key constraint failed.');
      case 'P2025':
        return new NotFoundException('Record not found.');
      case 'P2001':
        return new NotFoundException('Record does not exist.');
      case 'P2004':
        return new UnauthorizedException('Database constraint violation.');
      default:
        return new InternalServerErrorException(
          `Prisma error: ${error.message}`
        );
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    return new BadRequestException('Invalid input data.');
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    return new InternalServerErrorException(
      'Database initialization failed. Check connection settings.'
    );
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    return new InternalServerErrorException(
      'Unexpected database crash. Prisma panicked.'
    );
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return new InternalServerErrorException(
      'Unknown database request error occurred.'
    );
  } else {
    return new InternalServerErrorException(
      'An unexpected database error occurred.'
    );
  }
}
