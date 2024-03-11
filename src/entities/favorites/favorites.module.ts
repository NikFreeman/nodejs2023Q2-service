import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { HelpersService } from 'src/shared/helpers/helpers.service';
import { StoreService } from 'src/shared/store/store.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, HelpersService, StoreService],
})
export class FavoritesModule {}
