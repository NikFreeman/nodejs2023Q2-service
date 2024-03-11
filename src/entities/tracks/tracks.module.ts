import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { HelpersService } from 'src/shared/helpers/helpers.service';
import { StoreService } from 'src/shared/store/store.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, HelpersService, StoreService],
})
export class TracksModule {}
