import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID } from 'class-validator';
import { ITrack } from 'src/interfaces/track';

export class Track implements ITrack {
  @ApiProperty({
    description: 'Track identifier',
    format: 'uuid',
  })
  @IsUUID(4)
  id: string;
  @ApiProperty({ description: 'Name track', example: 'Innuendo' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Artist identifier',
    format: 'uuid',
    nullable: true,
  })
  @IsUUID(4)
  artistId: string | null;
  @ApiProperty({
    description: 'Album identifier',
    format: 'uuid',
    nullable: true,
  })
  @IsUUID(4)
  albumId: string | null;
  @ApiProperty({
    description: 'The track duration',
    format: 'number',
    nullable: true,
  })
  @IsInt()
  duration: number;

  constructor(partial: Partial<ITrack>) {
    Object.assign(this, partial);
  }
}
