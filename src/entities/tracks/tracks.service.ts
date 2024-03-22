import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}
  async create(createTrackDto: CreateTrackDto) {
    const createdTrack = await this.prisma.track.create({
      data: { ...createTrackDto },
    });
    // const id = this.helperService.getUUID();
    // const artist = StoreService.artists.filter(
    //   (item) => item.id == createTrackDto.artistId,
    // );
    // const artistId = artist.length > 0 ? createTrackDto.artistId : null;
    // const album = StoreService.albums.filter(
    //   (item) => item.id == createTrackDto.albumId,
    // );
    // const albumId = album.length > 0 ? createTrackDto.albumId : null;
    // const createTrack: ITrack = new Track({
    //   id: id,
    //   name: createTrackDto.name,
    //   albumId: albumId,
    //   artistId: artistId,
    //   duration: createTrackDto.duration,
    // });
    // StoreService.tracks.push(createTrack);
    return createdTrack;
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);
    if (!track) return false;
    const updatedTrack = await this.prisma.track.update({
      where: { id: id },
      data: { ...updateTrackDto },
    });
    return updatedTrack;
  }

  async remove(id: string) {
    await this.prisma.track.delete({ where: { id: id } });
    return;
  }
}
