import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { HelpersService } from 'src/shared/helpers/helpers.service';
import { StoreService } from 'src/shared/store/store.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, HelpersService, StoreService],
})
export class AlbumsModule {}
