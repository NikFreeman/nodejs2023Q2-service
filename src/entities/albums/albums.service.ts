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
    return createdAlbum;
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.album.findUnique({ where: { id: id } });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const updatedAlbum = await this.prisma.album.update({
      where: { id: id },
      data: { ...updateAlbumDto },
    });
    return updatedAlbum;
  }

  async remove(id: string) {
    await this.prisma.album.delete({ where: { id: id } });
    return;
  }
}
