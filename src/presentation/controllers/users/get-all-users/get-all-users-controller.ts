import { Controller, Get, HttpCode, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/main/usecases/users/users.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class GetAllUsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  async handle() {
    try {
      return null;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      } else {
        throw new HttpException('Server error', 500);
      }
    }
  }
}
