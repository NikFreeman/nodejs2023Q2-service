import { Album } from 'src/entities/albums/entities/album.entity';
import { Artist } from 'src/entities/artists/entities/artist.entity';
import { Track } from 'src/entities/tracks/entities/track.entity';

export interface IFavorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export enum Entity {
  album = 'album',
  artist = 'artist',
  track = 'track',
}
