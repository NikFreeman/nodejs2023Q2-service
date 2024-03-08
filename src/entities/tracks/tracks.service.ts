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
    return createdTrack;
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.track.findUnique({ where: { id: id } });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      const updatedTrack = await this.prisma.track.update({
        where: { id: id },
        data: { ...updateTrackDto },
      });
      return updatedTrack;
    } catch {
      return false;
    }
  }

  async remove(id: string) {
    await this.prisma.track.delete({ where: { id: id } });
    return;
  }
}
