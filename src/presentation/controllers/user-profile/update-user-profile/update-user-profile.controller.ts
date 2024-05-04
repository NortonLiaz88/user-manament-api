import { Body, Controller, Put, HttpCode } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOAuth2,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { JwtTokenContent } from 'src/domain/models/auth-token';
import { UserProfileUpdateDto } from 'src/main/dto/user-profile/update-user-profile/update-user-profile.dto';
import { UserProfileResponseDto } from 'src/main/dto/user-profile/view-user-profile/view-user-profile.dto';
import { UserProfileService } from 'src/main/usecases/user-profile/use-profile.service';
import { CurrentUser } from 'src/presentation/decorators/user-decorator';

@ApiBearerAuth()
@ApiTags('User Profile')
@Controller('me')
export class UpdateUserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Put('/')
  @FormDataRequest({ storage: MemoryStoredFile })
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ type: UserProfileResponseDto, status: 200 })
  async update(
    @CurrentUser() user: JwtTokenContent,
    @Body() userData: UserProfileUpdateDto,
  ): Promise<any> {
    const response = await this.userProfileService.updateUserProfile(
      user.payload.id,
      userData,
    );
    return response;
  }
}
