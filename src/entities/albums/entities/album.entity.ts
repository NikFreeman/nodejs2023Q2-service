import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID } from 'class-validator';
import { IAlbum } from 'src/interfaces/album';

export class Album implements IAlbum {
  @ApiProperty({
    description: 'Album identifier',
    format: 'uuid',
  })
  @IsUUID(4)
  id: string;
  @ApiProperty({ description: 'Name album', example: 'Innuendo' })
  @IsString()
  name: string;
  @ApiProperty({ description: 'Year album', example: '1991' })
  @IsInt()
  year: number;
  @ApiProperty({
    description: 'Artist identifier',
    format: 'uuid',
    nullable: true,
  })
  @IsUUID(4)
  artistId: string | null;

  constructor(partial: Partial<IAlbum>) {
    Object.assign(this, partial);
  }
}
