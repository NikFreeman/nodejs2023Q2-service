import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Track } from '../tracks/entities/track.entity';
import { Injectable } from '@nestjs/common';
import { StoreService } from 'src/shared/store/store.service';

@Injectable()
export class FavoritesService {
  findAll() {
    const albums: Album[] = [];
    const artists: Artist[] = [];
    const tracks: Track[] = [];
    StoreService.favorites.albums.forEach((elem) => {
      if (elem) {
        const album = StoreService.albums.find((item) => item.id == elem);
        if (album) albums.push(album);
      }
    });
    StoreService.favorites.artists.forEach((elem) => {
      if (elem) {
        const artist = StoreService.artists.find((item) => item.id == elem);
        if (artist) artists.push(artist);
      }
    });
    StoreService.favorites.tracks.forEach((elem) => {
      if (elem) {
        const track = StoreService.tracks.find((item) => item.id == elem);
        if (track) tracks.push(track);
      }
    });
    return { albums, artists, tracks };
  }

  add(entity: string, id: string) {
    switch (entity) {
      case 'track':
        const track = StoreService.tracks.filter((track) => track.id == id);
        if (track.length == 0) return false;
        StoreService.favorites.tracks.push(id);
        return true;
      case 'album':
        const album = StoreService.albums.filter((album) => album.id == id);
        if (album.length == 0) return false;
        StoreService.favorites.albums.push(id);
        return true;
      case 'artist':
        const artist = StoreService.artists.filter((artist) => artist.id == id);
        if (artist.length == 0) return false;
        StoreService.favorites.artists.push(id);
        return true;
    }
  }

  remove(entity: string, id: string) {
    switch (entity) {
      case 'track':
        const track = StoreService.favorites.tracks.filter(
          (track) => track == id,
        );

        if (track.length == 0) return false;

        StoreService.favorites.tracks = StoreService.favorites.tracks.filter(
          (track) => track != id,
        );
        console.log('after', StoreService.favorites.tracks);
        return true;
      case 'album':
        const album = StoreService.favorites.albums.filter(
          (album) => album == id,
        );
        if (album.length == 0) return false;
        StoreService.favorites.albums = StoreService.favorites.albums.filter(
          (album) => album != id,
        );
        return true;
      case 'artist':
        const artist = StoreService.favorites.artists.filter(
          (artist) => artist == id,
        );
        if (artist.length == 0) return false;
        StoreService.favorites.artists = StoreService.favorites.artists.filter(
          (artist) => artist != id,
        );
        return true;
    }
  }
}
