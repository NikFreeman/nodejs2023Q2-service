import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { HelpersService } from 'src/shared/helpers/helpers.service';
import { StoreService } from 'src/shared/store/store.service';
import { Track } from './entities/track.entity';
import { ITrack } from 'src/interfaces/track';

@Injectable()
export class TracksService {
  constructor(private readonly helperService: HelpersService) {}
  create(createTrackDto: CreateTrackDto) {
    const id = this.helperService.getUUID();
    const artist = StoreService.artists.filter(
      (item) => item.id == createTrackDto.artistId,
    );
    const artistId = artist.length > 0 ? createTrackDto.artistId : null;
    const album = StoreService.albums.filter(
      (item) => item.id == createTrackDto.albumId,
    );
    const albumId = album.length > 0 ? createTrackDto.albumId : null;
    const createTrack: ITrack = new Track({
      id: id,
      name: createTrackDto.name,
      albumId: albumId,
      artistId: artistId,
      duration: createTrackDto.duration,
    });
    StoreService.tracks.push(createTrack);
    return createTrack;
  }

  findAll() {
    return StoreService.tracks;
  }

  findOne(id: string) {
    const [track] = StoreService.tracks.filter((track) => track.id == id);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const index = StoreService.tracks.findIndex((track) => track.id === id);
    if (index == -1) return false;
    const { name, artistId, albumId, duration } = updateTrackDto;
    const artist = StoreService.artists.filter((item) => item.id == artistId);
    const updateArtistId = artist.length == 1 ? artistId : null;
    const album = StoreService.albums.filter((item) => item.id == albumId);
    const updateAlbumId = album.length == 1 ? albumId : null;
    const updatedTrack: ITrack = {
      id,
      name: name || StoreService.tracks[index].name,
      albumId: updateAlbumId,
      artistId: updateArtistId,
      duration: duration,
    };
    StoreService.tracks[index] = updatedTrack;
    return updatedTrack;
  }

  remove(id: string) {
    StoreService.tracks = StoreService.tracks.filter((track) => track.id != id);
    return;
  }
}
