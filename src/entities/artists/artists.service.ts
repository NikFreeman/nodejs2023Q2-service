import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}
  async create(createArtistDto: CreateArtistDto) {
    const artist = await this.prisma.artist.create({
      data: {
        ...createArtistDto,
      },
    });
    return artist;
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id: id } });
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);
    if (!artist) return false;
    const updatedArtist = await this.prisma.artist.update({
      where: { id: id },
      data: {
        ...updateArtistDto,
      },
    });
    return updatedArtist;
  }

  async remove(id: string) {
    await this.prisma.artist.delete({ where: { id: id } });

    // StoreService.albums.forEach((album) => {
    //   if (album.artistId == id) album.artistId = null;
    // });
    // StoreService.tracks.forEach((track) => {
    //   if (track.artistId == id) track.artistId = null;
    // });
    return;
  }
}
