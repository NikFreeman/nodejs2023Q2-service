import {
  Body,
  ClassSerializerInterceptor,
  ConflictException,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../users/entities/user.entity';
@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Create user',
    description: 'Creates a new user',
  })
  @ApiCreatedResponse({
    description: 'The user has been created.',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
  })
  @Public()
  async signup(@Body() signupDto: CreateUserDto) {
    try {
      const user = await this.authService.signup(signupDto);
      return plainToInstance(UserResponseDto, user);
    } catch (error) {
      {
        throw new ConflictException(error.message);
      }
    }
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description: 'Logins a user and returns a JWT-token',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Successful login.',
  })
  @ApiForbiddenResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Incorrect login or password',
  })
  @HttpCode(HttpStatus.OK)
  @Public()
  async login(@Body() signInDto: LoginUserDto) {
    try {
      return await this.authService.login(signInDto);
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'refresh token',
    description: 'Refresh token',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Successful login.',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'no refreshToken in body',
  })
  @ApiForbiddenResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Refresh token is invalid or expired',
  })
  @HttpCode(HttpStatus.OK)
  @Public()
  async refresh(@Body() { refreshToken }: RefreshTokenDto) {
    try {
      return await this.authService.refresh(refreshToken);
    } catch (error) {
      throw error;
    }
  }
}
