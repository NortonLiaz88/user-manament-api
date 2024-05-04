import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { UserPermission } from 'src/enums/user-permission';

export class UserCreatorDTO {
  @ApiProperty({ type: 'integer', minimum: 1 })
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  profile: string;
}

export class UserProfileResponseDto {
  @ApiProperty({ type: 'integer', minimum: 1 })
  id: number;

  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ required: false })
  profileImageUrl?: string;

  @ApiProperty({
    default: Permission.GUEST,
    required: true,
    enum: Permission,
  })
  @IsEnum(Permission)
  permission: Permission;

  @ApiProperty({ required: false })
  createdBy?: UserCreatorDTO;

  @ApiProperty()
  createdAt: Date;
}
