import {
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtTokenContent } from 'src/domain/models/auth-token';
import { UserResponseDto } from 'src/main/dto/user/get-user/get-user.dto';
import { UserUpdateDto } from 'src/main/dto/user/update-user/update-user.dto';
import { UserService } from 'src/main/usecases/users/users.service';
import { CurrentUser } from 'src/presentation/decorators/user-decorator';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UpdateUser {
  constructor(private readonly userService: UserService) {}

  @Put('/:id')
  @HttpCode(200)
  @ApiResponse({ type: UserResponseDto, status: 200 })
  async update(
    @CurrentUser() user: JwtTokenContent,
    @Body() userData: UserUpdateDto,
    @Param('id') id: number,
  ): Promise<any> {
    if (user.payload.permission !== 'ADMIN') {
      throw new UnauthorizedException('Only admins can delete users');
    }
    const response = await this.userService.updateUser(+id, userData);
    return response;
  }
}
