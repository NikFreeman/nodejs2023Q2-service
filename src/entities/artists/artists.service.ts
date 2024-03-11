import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { HelpersService } from 'src/shared/helpers/helpers.service';
import { StoreService } from 'src/shared/store/store.service';
import { IArtist } from 'src/interfaces/artist';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly helperService: HelpersService,
    storeService: StoreService,
  ) {}
  create(createArtistDto: CreateArtistDto) {
    const id = this.helperService.getUUID();
    const artist: IArtist = new Artist({
      id: id,
      ...createArtistDto,
    });
    StoreService.artists.push(artist);
    return artist;
  }

  findAll() {
    return StoreService.artists;
  }

  findOne(id: string) {
    const [artist] = StoreService.artists.filter((artist) => artist.id == id);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const index = StoreService.artists.findIndex((artist) => artist.id == id);
    if (index == -1) return false;
    const { name, grammy } = updateArtistDto;
    const updatedArtist: IArtist = {
      id,
      name: name || StoreService.artists[index].name,
      grammy:
        grammy !== undefined ? grammy : StoreService.artists[index].grammy,
    };

    StoreService.artists[index] = updatedArtist;
    return updatedArtist;
  }

  remove(id: string) {
    StoreService.artists = StoreService.artists.filter(
      (artist) => artist.id != id,
    );
    return;
  }
}
