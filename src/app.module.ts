import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TracksController } from './tracks/tracks.controller';
import { AlbumsController } from './albums/albums.controller';
import { ArtistsController } from './artists/artists.controller';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites.service';
import { ArtistsService } from './artists/artists.service';
import { TracksService } from './tracks/tracks.service';
import { AlbumsService } from './albums/albums.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [
    AppController,
    UsersController,
    TracksController,
    AlbumsController,
    ArtistsController,
    FavoritesController,
  ],
  providers: [
    AppService,
    FavoritesService,
    ArtistsService,
    TracksService,
    AlbumsService,
    UsersService,
  ],
})
export class AppModule {}
