import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID, ValidateIf } from 'class-validator';

interface ICreateAlbumDto {
  name: string;
  year: number;
  artistId: string;
}

export class CreateAlbumDto implements ICreateAlbumDto {
  @ApiProperty({ description: 'The Album name', nullable: false })
  @IsString()
  name: string;
  @ApiProperty({ description: 'The Album year', nullable: false })
  @IsInt()
  year: number;
  @ApiProperty({ description: 'The Artist`s id', nullable: true })
  @ValidateIf((o) => o.artistId != null)
  @IsUUID(4)
  artistId: string | null;
}
