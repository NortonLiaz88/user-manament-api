import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { toInt } from 'src/presentation/transform/helper';

export class PaginationDto {
  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => toInt(value, { default: 1 }))
  page: number;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => toInt(value, { default: 1 }))
  take: number;
}

export class PageableDto {
  @ApiProperty({ default: 1 })
  page: number;

  @ApiProperty({ default: 10 })
  take: number;
}
