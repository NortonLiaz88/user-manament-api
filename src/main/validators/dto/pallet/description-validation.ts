import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class DescriptionCompliantRule implements ValidatorConstraintInterface {
  validate(description: string, args: ValidationArguments) {
    if (!args.object['approval'] && description.trim().length === 0) {
      return false;
    }
    return true;
  }

  defaultMessage(): string {
    return 'Description is required if report is rejected';
  }
}
