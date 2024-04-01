import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './entities/users/users.module';
import { AlbumsModule } from './entities/albums/albums.module';
import { ArtistsModule } from './entities/artists/artists.module';
import { TracksModule } from './entities/tracks/tracks.module';
import { FavoritesModule } from './entities/favorites/favorites.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './entities/auth/auth.module';
import { LoggerModule } from './logging/logging.module';
import { LoggerMiddleware } from './helpers/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    AlbumsModule,
    ArtistsModule,
    TracksModule,
    FavoritesModule,
    PrismaModule,
    AuthModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
