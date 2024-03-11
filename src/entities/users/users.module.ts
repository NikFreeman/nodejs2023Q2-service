import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HelpersService } from 'src/shared/helpers/helpers.service';
import { StoreService } from 'src/shared/store/store.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, HelpersService, StoreService],
})
export class UsersModule {}
