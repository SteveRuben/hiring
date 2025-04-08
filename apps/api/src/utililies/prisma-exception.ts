import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export const prismaError = (error: any, entity: string): never => {
  console.error(error);
  // PrismaClientKnownRequestError
  if (error.code) {
    switch (error.code) {
      case 'P2002':
        // Unique constraint violation
        throw new ConflictException(
          `A ${entity} with this value already exists.`,
        );
      case 'P2025':
        // Record not found
        throw new NotFoundException(`${entity} not found.`);
      case 'P2003':
        // Foreign key constraint failed
        throw new BadRequestException('Invalid foreign key reference.');
      case 'P2004':
        // Database constraint violation
        throw new ForbiddenException('Database policy violation.');
      default:
        throw new InternalServerErrorException('Unknown server error.');
    }
  }

  // If no known code, throw generic error
  throw new InternalServerErrorException('An unexpected error occurred.');
};
