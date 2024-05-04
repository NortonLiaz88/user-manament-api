import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '@prisma/client';
import {
  IsEmail,
  MinLength,
  MaxLength,
  IsString,
  IsStrongPassword,
  IsEnum,
} from 'class-validator';
import { UserPermission } from 'src/enums/user-permission';

export class UserCreateDto {
  @ApiProperty({ default: 'example@email.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'João', required: true })
  @MinLength(3)
  @MaxLength(52)
  @IsString()
  name: string;

  @ApiProperty({ default: 'joao', required: true })
  @MinLength(3)
  @MaxLength(52)
  @IsString()
  username: string;

  @ApiProperty({ default: '12345678', required: true })
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ default: 'Silva', required: true })
  @MinLength(3)
  @MaxLength(52)
  @IsString()
  lastName: string;

  @ApiProperty({
    default: UserStatus.ACTIVE,
    required: true,
    enum: UserStatus,
  })
  @IsEnum(UserStatus)
  status: UserStatus;

  @ApiProperty({
    default: UserPermission.Guest,
    required: true,
    enum: UserPermission,
  })
  @IsEnum(UserPermission)
  permission: UserPermission;
}
