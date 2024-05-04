import { ApiProperty } from '@nestjs/swagger';

export class LastUsersResponseDto {
  @ApiProperty({ type: 'integer', minimum: 0 })
  total: number;
  @ApiProperty({ type: 'array', items: { type: 'string' } })
  users: string[];
}

export class UserMetricsResponseDto {
  @ApiProperty({ type: 'integer', minimum: 0 })
  totalUsers: number;
  @ApiProperty({ type: 'integer', minimum: 0 })
  totalActiveUsers: number;
  @ApiProperty({ type: 'integer', minimum: 0 })
  totalInactiveUsers: number;
  @ApiProperty({ type: 'integer', minimum: 0 })
  totalAdminUsers: number;
  @ApiProperty({ type: 'integer', minimum: 0 })
  totalGuestUsers: number;
  @ApiProperty({ type: LastUsersResponseDto })
  lastUsers: LastUsersResponseDto;
}
