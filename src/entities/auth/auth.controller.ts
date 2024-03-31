import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @Public()
  async signup(@Body() signupDto: CreateUserDto) {
    try {
      return await this.authService.signup(signupDto);
    } catch (error) {
      {
        throw new ConflictException(error.message);
      }
    }
  }

  @Post('login')
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
  @Public()
  async refresh(@Body() { refreshToken }: RefreshTokenDto) {
    try {
      return await this.authService.refresh(refreshToken);
    } catch (error) {
      throw error;
    }
  }
}
