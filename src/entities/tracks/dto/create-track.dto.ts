import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID, ValidateIf } from 'class-validator';

interface ICreateTrackDto {
  name: string;
  artistId: string;
  albumId: string;
  duration: number;
}

export class CreateTrackDto implements ICreateTrackDto {
  @ApiProperty({ description: 'The Track name', nullable: false })
  @IsString()
  name: string;
  @ApiProperty({ description: 'The Artist`s id', nullable: true })
  @ValidateIf((o) => o.artistId != null)
  @IsUUID(4)
  artistId: string | null;
  @ApiProperty({ description: 'The Album id', nullable: true })
  @ValidateIf((o) => o.albumId != null)
  @IsUUID(4)
  albumId: string | null;
  @ApiProperty({ description: 'The track duration', nullable: false })
  @IsInt()
  duration: number;
}
