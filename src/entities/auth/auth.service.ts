import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtPayload } from 'src/interfaces/jwtPayload';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }
  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findOneByLogin(loginUserDto);

    if (!user) {
      throw new Error('Forbidden operation');
    }

    const payload: JwtPayload = {
      userId: user.id,
      login: user.login,
    };

    return await this.generateTokens(payload);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        refreshToken,
        { secret: process.env.JWT_SECRET_REFRESH_KEY },
      );
      const { userId, login } = payload;
      const user = await this.usersService.findOne(userId);
      if (user)
        if (user.login !== login) {
          throw new Error("Bad token. Login doesn't match with userId");
        }
      return await this.generateTokens({ login, userId });
    } catch (error) {
      throw new Error('Bad refresh token');
    }
  }

  private async generateTokens(payload: JwtPayload) {
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      }),
    };
  }
}
