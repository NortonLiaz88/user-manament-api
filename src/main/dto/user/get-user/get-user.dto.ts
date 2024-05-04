import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '@prisma/client';

export class StrictProfileDTO {
  @ApiProperty({ type: 'integer', minimum: 1 })
  id: number;

  @ApiProperty()
  name: string;
}

export class StrictSectorDTO {
  @ApiProperty({ type: 'integer', minimum: 1 })
  id: number;

  @ApiProperty()
  name: string;
}

export class UserResponseDto {
  @ApiProperty({ type: 'integer', minimum: 1 })
  id: number;

  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  registration: string;

  @ApiProperty({
    pattern: '/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im',
  })
  phoneNumber: string;

  @ApiProperty()
  sector: StrictSectorDTO;

  @ApiProperty({ enum: UserStatus })
  status: UserStatus;

  @ApiProperty()
  profile: StrictProfileDTO;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
