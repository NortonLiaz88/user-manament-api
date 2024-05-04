import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';
import { EntityValidationError } from 'src/main/errors/validation/entity.validation';

@Catch(UnprocessableEntityException)
export class UnprocessableEntityExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errors = exception['response']['message'].map((error) => {
      const constraints = error.field;
      const field = error.field;
      const value = error.value;
      const location = 'BODY'; // Define a localização do erro, neste caso, é o corpo da solicitação.
      const message = error.message;

      for (const key in constraints) {
        if (constraints.hasOwnProperty(key)) {
          const code = `INVALID_${field.toUpperCase()}`; // Código de erro personalizado para campos inválidos
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

    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      title: 'SemanticError',
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      detail: 'The data is inconsistent with the expected pattern.',
      errors,
    });
  }
}
