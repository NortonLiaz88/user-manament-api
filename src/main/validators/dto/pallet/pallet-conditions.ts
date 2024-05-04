import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { DescriptionCompliantRule } from './description-validation';

export class Condition {
  @IsString()
  @Validate(DescriptionCompliantRule)
  description?: string;
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  approval: boolean;
}

export class ConditionsValidation {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Condition)
  conditions: Condition[];
}
