import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class EndLaterThanStartRule implements ValidatorConstraintInterface {
  validate(date: Date, args: ValidationArguments) {
    const verify =
      new Date(date).getTime() >= new Date(args.object['startAt']).getTime();
    return verify;
  }

  defaultMessage(): string {
    return 'end date should be later than start date';
  }
}
