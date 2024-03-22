import { PrismaService } from 'src/prisma/prisma.service';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const tracks = await this.prisma.track.findMany({
      where: { favoriteTrack: { isNot: null } },
    });
    const albums = await this.prisma.album.findMany({
      where: { favoriteAlbum: { isNot: null } },
    });
    const artists = await this.prisma.artist.findMany({
      where: { favoriteArtist: { isNot: null } },
    });
    return { albums, artists, tracks };
  }

  async add(entity: string, id: string) {
    switch (entity) {
      case 'track':
        try {
          await this.prisma.favoriteTrack.create({
            data: { trackId: id },
          });
          return true;
        } catch {
          return false;
        }

      case 'album':
        try {
          await this.prisma.favoriteAlbum.create({ data: { albumId: id } });
          return true;
        } catch {
          return false;
        }
      case 'artist':
        try {
          await this.prisma.favoriteArtist.create({ data: { artistId: id } });
          return true;
        } catch {
          return false;
        }
    }
  }

  async remove(entity: string, id: string) {
    switch (entity) {
      case 'track':
        try {
          await this.prisma.favoriteTrack.delete({
            where: { trackId: id },
          });
          return true;
        } catch {
          return false;
        }

      case 'album':
        try {
          await this.prisma.favoriteAlbum.delete({
            where: { albumId: id },
          });
          return true;
        } catch {
          return false;
        }

      case 'artist':
        try {
          await this.prisma.favoriteArtist.delete({
            where: { artistId: id },
          });
          return true;
        } catch {
          return false;
        }
    }
  }
}
