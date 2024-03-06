import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from 'src/interfaces/user';
import { getUUID } from 'src/helpers/getUuid';
import { getTimestamp } from 'src/helpers/getTimestamp';
import { User } from './entities/user.entity';
import { validate } from 'class-validator';

@Injectable()
export class UsersService {
  private _users: IUser[] = [];

  async create(createUserDto: CreateUserDto) {
    const user: IUser = new User({
      id: getUUID(),
      version: 1,
      createdAt: getTimestamp(),
      updatedAt: 0,
      ...createUserDto,
    });
    const errors = await validate(user);
    this._users.push(user);
    return user;
  }

  findAll() {
    return this._users;
  }

  findOne(id: string) {
    return this._users.filter((user) => user.id == id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const index = this._users.findIndex((user) => (user.id = id));

    if (index === -1) return;
    const { login, password, version, createdAt } = this._users[index];
    const { oldPassword, newPassword } = updateUserDto;
    if (password == oldPassword) {
      const user: IUser = new User({
        id: id,
        login: login,
        version: version + 1,
        createdAt: createdAt,
        updatedAt: getTimestamp(),
        password: newPassword,
      });
      this._users[index] = user;
      return user;
    }
    return;
  }

  remove(id: string) {
    return (this._users = this._users.filter((user) => user.id != id));
  }
}
