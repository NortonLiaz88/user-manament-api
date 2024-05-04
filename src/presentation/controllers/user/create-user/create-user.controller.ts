import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from 'src/main/dto/user/create-user/create-user.dto';
import { UserResponseDto } from 'src/main/dto/user/get-user/get-user.dto';
import { UserService } from 'src/main/usecases/users/users.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class CreateUser {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @HttpCode(201)
  @ApiResponse({ type: UserResponseDto, status: 201 })
  async create(@Body() userData: UserCreateDto): Promise<UserResponseDto> {
    const response = await this.userService.createUser(userData);
    return response;
  }
}
