import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';
import { EntityValidationError } from '../../../main/errors/validation/entity.validation';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let errors = [];
    if (Array.isArray(exception['response']['message'])) {
      errors = exception['response']['message']?.map((error) => {
        const constraints = error.field;
        const field = error.field;
        const value = error.value;
        const location = 'QUERY';
        const message = error.message;

        for (const key in constraints) {
          if (constraints.hasOwnProperty(key)) {
            const code = `INVALID_${field.toUpperCase()}`;
            return new EntityValidationError(
              location,
              code,
              message,
              field,
              value,
            );
          }
        }
      });
    } else {
      errors = [exception['response']];
    }

    response.status(HttpStatus.BAD_REQUEST).json({
      title: 'SemanticError',
      status: HttpStatus.BAD_REQUEST,
      detail: 'The data is inconsistent with the expected pattern.',
      errors,
    });
  }
}
