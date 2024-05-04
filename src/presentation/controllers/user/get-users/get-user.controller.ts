import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtTokenContent } from 'src/domain/models/auth-token';
import { PaginatedResultDTO } from 'src/main/dto/commons/pageable.dto';
import { UserStrictResponseDto } from 'src/main/dto/user/get-paginated-users/get-users-with-pagination.dto';
import { QueryUserDto } from 'src/main/dto/user/get-paginated-users/query-user.dto';
import { UserResponseDto } from 'src/main/dto/user/get-user/get-user.dto';
import { UserService } from 'src/main/usecases/users/users.service';
import { CurrentUser } from 'src/presentation/decorators/user-decorator';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class GetUsers {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @ApiResponse({ type: PaginatedResultDTO<UserStrictResponseDto>, status: 200 })
  @HttpCode(200)
  async handle(
    @CurrentUser() user: JwtTokenContent,
    @Query() query: QueryUserDto,
  ): Promise<PaginatedResultDTO<UserStrictResponseDto>> {
    const response = await this.userService.getAllWithPagination(
      { page: query.page, take: query.take },
      { order: query.order, orderBy: query.orderBy },
      query.search,
      user.payload.id,
    );
    return response;
  }

  @Get('/:id')
  @ApiResponse({ type: UserResponseDto, status: 200 })
  @HttpCode(200)
  async findUser(@Param('id') id: number) {
    const response = await this.userService.getById(+id);
    return response;
  }
}
