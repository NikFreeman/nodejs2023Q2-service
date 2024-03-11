import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { HelpersService } from 'src/shared/helpers/helpers.service';
import { StoreService } from 'src/shared/store/store.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, HelpersService, StoreService],
})
export class ArtistsModule {}
