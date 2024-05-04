import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtTokenContent } from 'src/domain/models/auth-token';
import { UserProfileResponseDto } from 'src/main/dto/user-profile/view-user-profile/view-user-profile.dto';
import { UserProfileService } from 'src/main/usecases/user-profile/use-profile.service';
import { CurrentUser } from 'src/presentation/decorators/user-decorator';

@ApiBearerAuth()
@ApiTags('User Profile')
@Controller('me')
export class GetUserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get()
  @ApiResponse({ type: UserProfileResponseDto, status: 200 })
  @HttpCode(200)
  async viewUserProfile(@CurrentUser() user: JwtTokenContent) {
    const response = await this.userProfileService.viewUserProfile(
      user.payload.id,
    );
    return response;
  }
}
