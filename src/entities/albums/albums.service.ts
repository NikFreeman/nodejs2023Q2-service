import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { HelpersService } from 'src/shared/helpers/helpers.service';
import { StoreService } from 'src/shared/store/store.service';
import { IAlbum } from 'src/interfaces/album';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(private readonly helperService: HelpersService) {}
  create(createAlbumDto: CreateAlbumDto) {
    const id = this.helperService.getUUID();
    const artist = StoreService.artists.filter(
      (item) => item.id == createAlbumDto.artistId,
    );

    const artistId = artist.length == 1 ? createAlbumDto.artistId : null;
    const createAlbum: IAlbum = new Album({
      id: id,
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: artistId,
    });
    StoreService.albums.push(createAlbum);
    return createAlbum;
  }

  findAll() {
    return StoreService.albums;
  }

  findOne(id: string) {
    const [album] = StoreService.albums.filter((album) => album.id == id);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const index = StoreService.albums.findIndex((album) => album.id == id);
    if (index == -1) return false;
    const { name, year, artistId } = updateAlbumDto;
    const artist = StoreService.artists.filter((item) => item.id == artistId);
    const updateArtistId = artist.length == 1 ? artistId : null;
    const updatedAlbum: IAlbum = {
      id,
      name: name || StoreService.albums[index].name,
      year: year !== undefined ? year : StoreService.albums[index].year,
      artistId: updateArtistId,
    };

    StoreService.albums[index] = updatedAlbum;
    return updatedAlbum;
  }

  remove(id: string) {
    StoreService.albums = StoreService.albums.filter((album) => album.id != id);
    StoreService.tracks.forEach((track) => {
      if (track.albumId == id) track.albumId = null;
    });
    return;
  }
}
