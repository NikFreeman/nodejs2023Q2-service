import { StoreService } from './../../shared/store/store.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from 'src/interfaces/user';
import { HelpersService } from 'src/shared/helpers/helpers.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly helperService: HelpersService) {}

  async create(createUserDto: CreateUserDto) {
    const id = this.helperService.getUUID();
    const timestamp = this.helperService.getTimestamp();
    const user: IUser = new User({
      id: id,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
      ...createUserDto,
    });
    StoreService.users.push(user);
    return user;
  }

  findAll() {
    return StoreService.users;
  }

  findOne(id: string) {
    const [user] = StoreService.users.filter((user) => user.id == id);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const index = StoreService.users.findIndex((user) => user.id == id);
    if (index == -1) return false;
    const { login, password, version, createdAt } = StoreService.users[index];
    const { oldPassword, newPassword } = updateUserDto;
    if (password == oldPassword) {
      const user: IUser = new User({
        id: id,
        login: login,
        version: version + 1,
        createdAt: createdAt,
        updatedAt: this.helperService.getTimestamp(),
        password: newPassword,
      });
      StoreService.users[index] = user;
      return user;
    }
    return false;
  }

  remove(id: string) {
    StoreService.users = StoreService.users.filter((user) => user.id != id);
    return;
  }
}
