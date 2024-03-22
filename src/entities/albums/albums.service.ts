import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}
  async create(createAlbumDto: CreateAlbumDto) {
    const createdAlbum = await this.prisma.album.create({
      data: {
        ...createAlbumDto,
      },
    });

    // const id = this.helperService.getUUID();
    // const artist = StoreService.artists.filter(
    //   (item) => item.id == createAlbumDto.artistId,
    // );

    // const artistId = artist.length == 1 ? createAlbumDto.artistId : null;
    // const createAlbum: IAlbum = new Album({
    //   id: id,
    //   name: createAlbumDto.name,
    //   year: createAlbumDto.year,
    //   artistId: artistId,
    // });
    // StoreService.albums.push(createAlbum);
    return createdAlbum;
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id: id } });
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);
    if (!album) return false;
    const updatedAlbum = await this.prisma.album.update({
      where: { id: id },
      data: { ...updateAlbumDto },
    });
    // const { name, year, artistId } = updateAlbumDto;
    // const artist = StoreService.artists.filter((item) => item.id == artistId);
    // const updateArtistId = artist.length == 1 ? artistId : null;
    // const updatedAlbum: IAlbum = {
    //   id,
    //   name: name || StoreService.albums[index].name,
    //   year: year !== undefined ? year : StoreService.albums[index].year,
    //   artistId: updateArtistId,
    // };

    // StoreService.albums[index] = updatedAlbum;
    return updatedAlbum;
  }

  async remove(id: string) {
    await this.prisma.album.delete({ where: { id: id } });

    return;
  }
}
