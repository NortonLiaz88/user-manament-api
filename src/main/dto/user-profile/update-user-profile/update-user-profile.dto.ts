import { ApiProperty } from '@nestjs/swagger';
import { MemoryStoredFile } from 'nestjs-form-data';

import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsDefined,
  IsStrongPassword,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class UserProfileUpdateDto {
  @ApiProperty({ format: 'email' })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  lastName: string;

  @ApiProperty({
    minLength: 6,
    format: 'password',
    readOnly: false,
    required: false,
  })
  @IsOptional()
  @IsString()
  oldPassword: string;

  @ApiProperty({
    minLength: 6,
    format: 'password',
    readOnly: false,
    required: false,
  })
  @IsString()
  @ValidateIf((o) => o.password !== undefined)
  @IsStrongPassword({ minLength: 6 })
  newPassword?: string;

  profileImage: MemoryStoredFile;
}
