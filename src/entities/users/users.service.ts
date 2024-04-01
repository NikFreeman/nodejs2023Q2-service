import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  SALT_ROUNDS = +process.env.CRYPT_SALT || 10;
  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, this.SALT_ROUNDS);
    createUserDto.password = hash;
    const userCreate = await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });
    return userCreate;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    try {
      return await this.prisma.user.findUnique({ where: { id: id } });
    } catch {
      return false;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (user) {
      const isValidPassword = await bcrypt.compare(
        updateUserDto.oldPassword,
        user.password,
      );
      if (isValidPassword) {
        const hash = await bcrypt.hash(
          updateUserDto.newPassword,
          this.SALT_ROUNDS,
        );
        try {
          const updateUser = this.prisma.user.update({
            where: { id: id },
            data: {
              updatedAt: new Date(),
              version: user.version + 1,
              password: hash,
            },
          });
          return updateUser;
        } catch {
          return false;
        }
      }
    }
    return false;
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({ where: { id: id } });
      return true;
    } catch {
      return false;
    }
  }

  async findOneByLogin(loginUserDto: LoginUserDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { login: loginUserDto.login },
      });
      if (user) {
        const isValidPassword = await bcrypt.compare(
          loginUserDto.password,
          user.password,
        );
        if (isValidPassword) {
          return user;
        }
        return false;
      }
    } catch {
      return false;
    }
  }
}
