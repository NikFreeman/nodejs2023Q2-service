//import { StoreService } from './../../shared/store/store.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const userCreate = this.prisma.user.create({
      data: {
        version: 1,
        ...createUserDto,
      },
    });
    console.log(userCreate);
    return userCreate;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    console.log('update->', user);

    const { oldPassword, newPassword } = updateUserDto;
    if (user.password == oldPassword) {
      const updateUser = this.prisma.user.update({
        where: { id: id },
        data: {
          updatedAt: new Date(),
          version: user.version + 1,
          password: newPassword,
        },
      });
      return updateUser;
    }
    return false;
  }

  async remove(id: string) {
    const user = await this.prisma.user.delete({ where: { id: id } });
    console.log('delete->', user);
    return;
  }
}
