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
    return await this.prisma.artist.findUnique({ where: { id: id } });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
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
    return;
  }
}
