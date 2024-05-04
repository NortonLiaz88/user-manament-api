import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from '../../../main/usecases/auth/auth.service';

import { SetMetadata } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { LoginResponseDto } from '../../dto/auth/login-response.dto';
import { ApiErrorDecorator } from '../../../main/errors/decorators/error.decorator';
import { LoginDto } from '../../../presentation/dto/auth/login.dto';
import { CreateAccountDto } from '../../../presentation/dto/account/create-account.dto';
import { RefreshTokenDto } from '../../../presentation/dto/auth/refresh-token.dto';
import { SubscribeValidationPipe } from '../../../main/validators/pipes/subscribe';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@ApiExtraModels(LoginResponseDto, UnauthorizedException)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'User authorized successful',
    schema: { $ref: getSchemaPath(LoginResponseDto) },
  })
  @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request')
  @ApiErrorDecorator(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server')
  @UsePipes(new SubscribeValidationPipe({}))
  async login(@Body() body: LoginDto) {
    try {
      const userValidation = await this.authService.loginWithCredentials({
        email: body.email,
        password: body.password,
      });
      if (!userValidation) {
        throw new UnauthorizedException();
      }
      return userValidation;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      } else {
        throw new HttpException('Server error', 500);
      }
    }
  }

  @Public()
  @Post('refresh-token')
  @ApiResponse({
    status: 201,
    description: 'User authorized successful',
    schema: { $ref: getSchemaPath(LoginResponseDto) },
  })
  @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request')
  @ApiErrorDecorator(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server')
  @UsePipes(new SubscribeValidationPipe({}))
  async refreshToken(@Body() body: RefreshTokenDto) {
    try {
      const userValidation = await this.authService.refreshToken(
        body.refreshToken,
      );
      if (!userValidation) {
        throw new UnauthorizedException();
      }
      return userValidation;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      } else {
        throw new HttpException('Server error', 500);
      }
    }
  }
}
