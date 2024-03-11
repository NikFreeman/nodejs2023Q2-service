import { Module } from '@nestjs/common';
import { HelpersService } from './helpers/helpers.service';
import { StoreService } from './store/store.service';

@Module({
  providers: [HelpersService, StoreService],
  exports: [HelpersService, StoreService],
})
export class SharedModule {}
