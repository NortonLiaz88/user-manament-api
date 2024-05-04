import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class StringRule implements ValidatorConstraintInterface {
  validate(value: string, _: ValidationArguments) {
    const pattern = new RegExp('^{[^{}]+}$|^{}$');
    const validate = pattern.test(value);
    return !validate;
  }

  defaultMessage(): string {
    return 'value must be a string';
  }
}
