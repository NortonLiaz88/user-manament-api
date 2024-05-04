import {
  Controller,
  Delete,
  HttpCode,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtTokenContent } from 'src/domain/models/auth-token';
import { UserService } from 'src/main/usecases/users/users.service';
import { CurrentUser } from 'src/presentation/decorators/user-decorator';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class DeleteUser {
  constructor(private readonly userService: UserService) {}

  @Delete('/:id')
  @HttpCode(204)
  async delete(
    @CurrentUser() user: JwtTokenContent,
    @Param('id') id: number,
  ): Promise<void> {
    if (user.payload.permission !== 'ADMIN') {
      throw new UnauthorizedException('Only admins can delete users');
    }
    await this.userService.deleteUser(+id);
  }
}
