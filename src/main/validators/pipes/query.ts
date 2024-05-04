import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class QueryValidationPipe implements PipeTransform<any> {
  constructor(private readonly validationOptions: any) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object, this.validationOptions);

    if (errors.length > 0) {
      throw this.buildError(errors);
    }

    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private buildError(errors: ValidationError[]) {
    const formattedErrors = errors.map((error) => ({
      field: error.property,
      value: error.value,
      message: error.constraints
        ? error.constraints[Object.keys(error.constraints)[0]]
        : 'Validation failed',
    }));

    if (this.validationOptions.exceptionFactory) {
      return this.validationOptions.exceptionFactory(formattedErrors);
    }
    return new BadRequestException(formattedErrors);
  }
}
