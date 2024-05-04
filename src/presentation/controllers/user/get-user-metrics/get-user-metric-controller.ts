import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserMetricsResponseDto } from 'src/main/dto/user/get-users-metrics/get-users-metrics.dto';
import { UserService } from 'src/main/usecases/users/users.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class GetUsersMetrics {
  constructor(private readonly userService: UserService) {}

  @Get('/metrics')
  @ApiResponse({
    type: UserMetricsResponseDto,
    status: 200,
  })
  @HttpCode(200)
  async handle(): Promise<UserMetricsResponseDto> {
    const response = await this.userService.getMetrics();
    return response;
  }
}
