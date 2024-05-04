import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class WildCardRule implements ValidatorConstraintInterface {
  validate(value: string, _: ValidationArguments) {
    const pattern = new RegExp('^_.*');
    const validate = pattern.test(value);
    return !validate;
  }

  defaultMessage(): string {
    return 'query does not accept the provided pattern';
  }
}
